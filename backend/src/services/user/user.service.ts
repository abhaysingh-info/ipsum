import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ControllerWrapper from 'src/utils/ControllerWrapper';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import {
  UpdatePaymentDto,
  UpdateUserDto,
} from '../../dto/user/update-user.dto';
import {
  getSelectiveGeneralData,
  User,
  UserDocument,
} from '../../entities/user.entity';
import { Express } from 'express';
import { S3Service } from 'src/services/s3/s3.service';
import { ObjectId } from 'mongoose';
import { GetUsersDto } from 'src/dto/user/get-users.dto';
import roles from '@shared/utils/dist/roles';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private s3Service: S3Service,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await ControllerWrapper(async () => {
      const emailExists = await this.UserModel.countDocuments({
        email: createUserDto.email,
      });
      if (emailExists) {
        throw new ConflictException('Email already exists!');
      }

      const phoneNumberExists = await this.UserModel.countDocuments({
        phoneNumber: createUserDto.phoneNumber,
      });
      if (phoneNumberExists) {
        throw new ConflictException('Phone Number already exists!');
      }

      const user = new this.UserModel(createUserDto);

      user.password = await user.getHash(user.password);

      await user.save();

      user.password = undefined;

      return user;
    });
  }

  async findAll(
    _filter: GetUsersDto,
    startFrom: number = 0,
    limit: number = 10,
  ) {
    const filters = {
      roles: roles.client,
    };
    if (_filter.email) {
      filters['email'] = {
        $regex: _filter.email,
      };
    }
    if (_filter.phone) {
      filters['phoneNumber'] = {
        $regex: _filter.phone,
      };
    }
    if (typeof _filter.payment_made === typeof true) {
      filters['payment_made'] = _filter.payment_made;
    }
    if (_filter.payment_status) {
      filters['payment_status'] = _filter.payment_status;
    }

    return await this.UserModel.find(filters, getSelectiveGeneralData)
      .skip(startFrom)
      .limit(limit);
  }

  async findOneByEmail(
    email: string,
    includePassword: boolean = false,
  ): Promise<UserDocument | null> {
    return await ControllerWrapper(async () => {
      return await this.UserModel.findOne({
        email: email,
      }).select(`${includePassword ? '+' : '-'}password`);
    });
  }

  async getUserById(
    id: ObjectId,
    includePassword: boolean = false,
    options: any = {},
  ): Promise<UserDocument | null> {
    return await ControllerWrapper(async () => {
      return await this.UserModel.findOne(
        {
          _id: id,
        },
        options,
      ).select(`${includePassword ? '+' : '-'}password`);
    });
  }

  async capturePayment(
    transaction_id: string,
    transaction_image: Express.Multer.File,
    user: UserDocument,
  ) {
    return await ControllerWrapper(async () => {
      if (!transaction_id || !transaction_image) {
        throw new BadRequestException('All fields are required!');
      }
      const allowedMimeType = [
        'image/jpg',
        'image/png',
        'image/jpeg',
        'image/webp',
      ];
      if (!allowedMimeType.includes(transaction_image.mimetype)) {
        throw new BadRequestException(
          'transaction_image is invalid, please provide valid image!',
        );
      }
      const imageUrl = await this.s3Service.uploadFile(transaction_image);
      if (!imageUrl) {
        throw new InternalServerErrorException(
          'Internal Server Error, if this error persist please contact our support',
        );
      }

      const _user = await this.UserModel.updateOne(
        {
          _id: user._id,
        },
        {
          payment_made: true,
          payment_status: 'pending',
          payment_screenshot: imageUrl,
          payment_transaction_id: transaction_id,
        },
      );
      if (_user.acknowledged) {
        return { success: true };
      } else {
        throw new InternalServerErrorException(
          'Failed to save data, if this error persists please contact out support',
        );
      }
    });
  }

  async updatePaymentStatus(updatePaymentDto: UpdatePaymentDto) {
    return await ControllerWrapper(async () => {
      const _user = await this.UserModel.updateOne(
        {
          _id: updatePaymentDto.userId,
        },
        {
          payment_status: updatePaymentDto.payment_status,
        },
      );
      if (_user.acknowledged) {
        return { success: true };
      } else {
        throw new InternalServerErrorException(
          'Failed to save data, if this error persists please contact out support',
        );
      }
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
