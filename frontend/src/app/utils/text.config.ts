export const eventRegistrationLink = 'https://forms.gle/kSV6f9wBYjDZUU4h9'

export const links = [
	{
		name: 'Home',
		path: '/#home',
	},
	{
		name: 'About',
		path: '/#about',
	},
	{
		name: 'Events',
		path: '/#event-schedule',
	},
	{
		name: 'Sponsors',
		path: '/#sponsors',
	},
	{
		name: 'FAQ',
		path: '/#faq',
	},
]

export const aboutSeminarSection = {
	title: 'About IPSUM',
	subtitle: 'Intelligence with Presentation & Smart Utilization of Management',
	description: `IPSUM is a 2-day inter-collegiate flagship event organized by the Department of Business Administration & International Business of MIT Arts, Commerce & Science College, Alandi (D), Pune which was initiated in 2014 with the aim of providing a platform for students to showcase their talents and skills through tons of contests ranging from business-centered competitions like Shark Tank, and Paper Trading to generalized competitions like Debates, and Quizzes to exciting and fun-filled games with attractive awards and cash prizes to the participants and winners.`,
}

export const eventSchedule = {
	title: 'Event Schedule',
	subtitle: '',
	schedules: [
		{
			date: new Date('2023-03-20'),
			events: [
				{
					_id: '1' as any,
					name: 'Money Island',
					description:
						'In this student entrepreneurs will have to present their business ideas either with PPT or pitch. A panel of three judges/investors, with an imaginary sum of 1 crore rupees at their disposal, will be present. The participant who manages to secure the highest investment amount from the judges/investors will be declared the winner of the competition. An entrepreneur will ask for an amount in exchange for a percentage of ownership. Entrepreneurs have to convince panel of judges/investors for investment in their idea(product/service). The more you earn the more chance to win.',

					commencementDate: new Date('2023-03-20'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/money-island-resize.webp',
					venue: 'MIT ACSC, Alandi',
					prizePool: 10000,
					moreInformationPdf:
						'https://drive.google.com/file/d/1pgoTniGkbGKZUzeZTe5Ikk5ptAFHbVFU/view?usp=sharing',
				},
				{
					_id: '2' as any,
					name: 'Brainer (Business Quiz)',
					description:
						'There will be 3 rounds in this game, the first two will be elimination rounds and last one will be winning round. 15, 10, 5 questions will be asked in every round respectively. Level of questions will increase in every round easy to hardest. The one who answers more questions in last round will be the winner.',
					commencementDate: new Date('2023-03-20'),
					eventBatch: 1,
					eventType: 'individual',
					image: '/assets/images/brainer-resize.webp',
					venue: 'MIT ACSC, Alandi',
					prizePool: 0,
					moreInformationPdf:
						'https://drive.google.com/file/d/1HRDCTgQV9VNTLDyaeV7uMDPzUkJvJD82/view?usp=sharing',
				},
				{
					_id: '3' as any,
					name: 'Food Stall',
					description:
						'Students will set up their own stalls and sell their food and products and earn money through it. For students the rent will be 500 rs /day and for outsiders the rent will range be 1000 rs per day.',

					commencementDate: new Date('2023-03-20'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/food-stall.webp',
					venue: 'MIT ACSC, Alandi',
					moreInformationPdf:
						'https://drive.google.com/file/d/1m6lxSq2m-Jn4XzPDwdxp4bf4HYiJxjXt/view?usp=sharing',
				},
				{
					_id: '4' as any,
					name: '1- Min Games',
					description:
						'In this game participants will have to pick a chit out of a bowl and whatever product is written on that chit, you have to pick it up and prepare an ad for it. You would be given a time of 5 minutes for making and preparing your ad in front of a judge.',

					commencementDate: new Date('2023-03-20'),
					eventBatch: 1,
					eventType: 'individual',
					image: '/assets/images/1mingame-resize.webp',
					venue: 'MIT ACSC, Alandi',
					prizePool: 0,
					hasGiftPrize: true,
					moreInformationPdf:
						'https://drive.google.com/file/d/1P2Tl5dC2sJ_BeqN61vYbmO886BXq0zH0/view?usp=sharing',
				},
			],
		},
		{
			date: new Date('2023-03-21'),
			events: [
				{
					_id: '1' as any,
					name: 'Sensing the sensex (Paper Trading)',
					description:
						'Participants will provide 3 tickets for buying and 3 tickets for selling and every time trader have to go to the broker for trade execution ( BUY/SELL)  All trades will done in a single lot and only gaining points will be decide as winner.  Participants have to complete task within 2 hours.',
					commencementDate: new Date('2023-03-21'),
					eventBatch: 1,
					eventType: 'individual',
					image: '/assets/images/sensex-resize.webp',
					venue: 'MIT ACSC, Alandi',
					prizePool: 3000,
					moreInformationPdf:
						'https://drive.google.com/file/d/1bw7pUv1fMIAtk2-AyEFCDPsgZB7u7p_q/view?usp=sharing',
				},
				{
					_id: '2' as any,
					name: 'Detective Game',
					description:
						'Some clues will be distributed on the campus containing the Ground Floor, Second Floor, and Garden Area. The team will have to find these clues in the given time in order to find the thief. Each team can play a mini-game to get an advantage. Upon winning the game, the team will be provided with a hint which will lead them to the location of the clue. The first team to find the culprit will win the round and will be promoted to the next round. The winner will be selected from the last two surviving teams. The team with the most points will win.',

					commencementDate: new Date('2023-03-21'),
					eventBatch: 1,
					eventType: 'team',
					image: '/assets/images/dectetive-resize.webp',
					venue: 'MIT ACSC, Alandi',
					prizePool: 500,
					moreInformationPdf:
						'https://drive.google.com/file/d/1NzsIDyAdvixh2-8DsQLawPq0DgHFOl2f/view?usp=share_link',
				},
				{
					_id: '3' as any,
					name: 'Word Clash (Debate)',
					description:
						'Debate will open with the affirmative team (the team that supports the resolution) presenting their arguments, followed by a member of the opposing team. This pattern is repeated for the second speaker in each team. Finally, each team gets an opportunity for rebutting the arguments of the opponent. Speakers should speak slowly and clearly. The judges and members of the audience should be taking notes as the debate proceeds.',

					commencementDate: new Date('2023-03-21'),
					eventBatch: 1,
					eventType: 'team',
					image: '/assets/images/word-clash-resize.webp',
					venue: 'MIT ACSC, Alandi',
					prizePool: 6000,
					moreInformationPdf:
						'https://drive.google.com/file/d/1n6-JcCnv61Gqsir5vAmvP0DbGgys0Mpr/view?usp=sharing',
				},
				{
					_id: '4' as any,
					name: '1- Min Speech',
					description:
						'This is a individual event. There will be a bowl full of chits with a topic written on it. Every participant have to choose one chit from the bowl. Candidate will get 2 minutes after choosing chit to think on the topic. After 2 minutes timer will start and each individual will have to talk on that for about one minute.',

					commencementDate: new Date('2023-03-21'),
					eventBatch: 1,
					eventType: 'individual',
					image: '/assets/images/speech-resize.webp',
					venue: 'MIT ACSC, Alandi',
					prizePool: 0,
					hasGiftPrize: true,
					moreInformationPdf:
						'https://drive.google.com/file/d/1BZk4MrintXsXJF1-MYDECHmVUPQAFZcS/view?usp=sharing',
				},
				{
					_id: '5' as any,
					name: 'Food Stall',
					description:
						'Students will set up their own stalls and sell their food and products and earn money through it. For students the rent will be 500 rs /day and for outsiders the rent will range be 1000 rs per day.',

					commencementDate: new Date('2023-03-21'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/food-stall.webp',
					venue: 'MIT ACSC, Alandi',
					moreInformationPdf:
						'https://drive.google.com/file/d/1m6lxSq2m-Jn4XzPDwdxp4bf4HYiJxjXt/view?usp=sharing',
				},
			],
		},
	],
}

export const faq: { question: string; answer: string }[] = [
	{
		question: 'What does IPSUM stand for and when did it initially start?',
		answer:
			'IPSUM stands for "Intelligence with Presentation & Smart Utilization of Management". It initially started in the year 2014 as a college-level fest but was celebrated at an inter-collegiate level from 2015 onwards.',
	},
	{
		question: 'How do I register for multiple events?',
		answer:
			'You can use the same registration link to register for multiple events. However, you will have to pay the registration fee for each event separately.',
	},
	{
		question:
			'What makes IPSUM unique and different from other Management fests?',
		answer:
			'IPSUM is an event that is entirely managed by the students from sponsorship to promotion to decorations to management and is conducted with the aim to provide students a platform wherein they can discover their hidden potential through fun and engaging competitions.',
	},
	{
		question: 'Where can we register for IPSUM?',
		answer:
			'Interested participants can register for IPSUM through an online google form available on our website (www.ipsum2k23.com) and the Instagram page (@mit_ipsum23). However, students may also register via offline mode through the marketing campaigns organized by our team at various colleges',
	},
	{
		question:
			'Can a student from another college put up a stall at IPSUM 2k23?',
		answer:
			'Yes, definitely! The major aim behind "Product & Food stalls: Be the Seller" is to provide individuals and groups of people a safe platform to share their products, foods, and other items with an interested and welcoming community of youths! The crowd at IPSUM 2k23 will definitely boost the morale of our young and talented sellers!',
	},
	{
		question: 'When is the last date to register for IPSUM?',
		answer:
			"One can register for the event till 18 March, 2023. However, it also depends on the availability of seats in the particular event. We suggest you register for the competition you're interested in at the earliest to avoid any last-minute chaos.",
	},
	{
		question: 'Is there a facility for spot-on registration?',
		answer:
			"Till 18 of March only.Since we're committed to making the event successful through proper planning and management, we refrain from accepting any spot-on registration to avoid chaos and confusion among participants and organizers.",
	},
	{
		question: 'What is the venue of IPSUM 2k23?',
		answer:
			'IPSUM 2k23 will be conducted at MIT ACSC, Alandi, Pune. Classrooms will be allotted at the time of the event.',
	},
]

export const eventRegistrationLinks = [
	{ eventName: 'Event 1', link: '/' },
	{ eventName: 'Event 2', link: '/' },
	{ eventName: 'Event 3', link: '/' },
	{ eventName: 'Event 4', link: '/' },
	{ eventName: 'Event 5', link: '/' },
]

export const sponsors = {
	associateSponsors: [
		{
			name: 'D S Creation',
			image: '/assets/images/ds-creation.webp',
		},
		{
			name: 'Munot Firm',
			image: '/assets/images/munot-firm.webp',
			titleSponsorer: true,
		},
		{
			name: 'Ya techno solution',
			image: '/assets/images/ya-technosolutions.webp',
			enlargeLogo: true,
		},
	],
}
