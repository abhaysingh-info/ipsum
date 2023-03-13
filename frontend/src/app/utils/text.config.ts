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
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime veniam, iste tenetur, numquam eius necessitatibus obcaecati veritatis repudiandae sint hic cumque esse itaque laudantium culpa optio voluptates mollitia autem! Laudantium quasi quo eligendi dolore obcaecati vel maxime officiis quae repellat, autem corporis et eveniet quis aliquid voluptate? Possimus, quasi fugit.',
}

export const eventSchedule = {
	title: 'Event Schedule',
	subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
	schedules: [
		{
			date: new Date('2023-03-21'),
			events: [
				{
					_id: '1' as any,
					name: 'Money Island',
					description:
						'In this student entrepreneurs will have to present their business ideas either with PPT or pitch. A panel of three judges/investors, with an imaginary sum of 1 crore rupees at their disposal, will be present. The participant who manages to secure the highest investment amount from the judges/investors will be declared the winner of the competition. An entrepreneur will ask for an amount in exchange for a percentage of ownership. Entrepreneurs have to convince panel of judges/investors for investment in their idea(product/service). The more you earn the more chance to win.',

					commencementDate: new Date('2021-05-10'),
					createdAt: new Date('2021-05-10'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/pexels-rodnae-productions-7915237.webp',
					venue: 'MIT ACSC, Alandi',
				},
				{
					_id: '2' as any,
					name: 'Word Clash (Debate)',
					description:
						'Debate will open with the affirmative team (the team that supports the resolution) presenting their arguments, followed by a member of the opposing team. This pattern is repeated for the second speaker in each team. Finally, each team gets an opportunity for rebutting the arguments of the opponent. Speakers should speak slowly and clearly. The judges and members of the audience should be taking notes as the debate proceeds.',

					commencementDate: new Date('2021-05-10'),
					createdAt: new Date('2021-05-10'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/pexels-rodnae-productions-7915237.webp',
					venue: 'MIT ACSC, Alandi',
				},
				{
					_id: '3' as any,
					name: 'Sensing the sensex (Paper Trading)',
					description:
						'Participants will provide 3 tickets for buying and 3 tickets for selling and every time trader have to go to the broker for trade execution ( BUY/SELL)  All trades will done in a single lot and only gaining points will be decide as winner.  Participants have to complete task within 2 hours.',

					commencementDate: new Date('2021-05-10'),
					createdAt: new Date('2021-05-10'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/pexels-rodnae-productions-7915237.webp',
					venue: 'MIT ACSC, Alandi',
				},
				{
					_id: '4' as any,
					name: 'Brainer (Business Quiz)',
					description:
						'There will be 3 rounds in this game, the first two will be elimination rounds and last one will be winning round. 15, 10, 5 questions will be asked in every round respectively. Level of questions will increase in every round easy to hardest. The one who answers more questions in last round will be the winner.',
					commencementDate: new Date('2021-05-10'),
					createdAt: new Date('2021-05-10'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/pexels-rodnae-productions-7915237.webp',
					venue: 'MIT ACSC, Alandi',
				},
			],
		},
		{
			date: new Date('2023-03-22'),
			events: [
				{
					_id: '1' as any,
					name: '1- Min Games',
					description:
						'In this game participants will have to pick a chit out of a bowl and whatever product is written on that chit, you have to pick it up and prepare an ad for it. You would be given a time of 5 minutes for making and preparing your ad in front of a judge.',

					commencementDate: new Date('2021-05-10'),
					createdAt: new Date('2021-05-10'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/pexels-rodnae-productions-7915237.webp',
					venue: 'MIT ACSC, Alandi',
				},
				{
					_id: '2' as any,
					name: '1- Min Speech',
					description:
						'This is a individual event. There will be a bowl full of chits with a topic written on it. Every participant have to choose one chit from the bowl. Candidate will get 2 minutes after choosing chit to think on the topic. After 2 minutes timer will start and each individual will have to talk on that for about one minute.',

					commencementDate: new Date('2021-05-10'),
					createdAt: new Date('2021-05-10'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/pexels-rodnae-productions-7915237.webp',
					venue: 'MIT ACSC, Alandi',
				},
				{
					_id: '3' as any,
					name: 'Detective Game',
					description:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime veniam, iste tenetur, numquam eius necessitatibus obcaecati veritatis repudiandae sint hic cumque esse itaque laudantium culpa optio voluptates mollitia autem! Laudantium quasi quo eligendi dolore obcaecati vel maxime officiis quae repellat, autem corporis et eveniet quis aliquid voluptate? Possimus, quasi fugit.',

					commencementDate: new Date('2021-05-10'),
					createdAt: new Date('2021-05-10'),
					eventBatch: 1,
					eventType: 'both',
					image: '/assets/images/pexels-rodnae-productions-7915237.webp',
					venue: 'MIT ACSC, Alandi',
				},
			],
		},
	],
}

export const faq: { question: string; answer: string }[] = [
	{
		question: 'What does IPSUM stands for?',
		answer: 'Intelligence with Presentation & Smart Utilization of Management',
	},
	{
		question: 'When did IPSUM initially start?',
		answer:
			'It was commenced in the year 2014 as a college-level fest but was celebrated at an inter-collegiate level from 2015 onwards.',
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
]

export const eventRegistrationLinks = [
	{ eventName: 'Event 1', link: '/' },
	{ eventName: 'Event 2', link: '/' },
	{ eventName: 'Event 3', link: '/' },
	{ eventName: 'Event 4', link: '/' },
	{ eventName: 'Event 5', link: '/' },
]

export const sponsors = [
	{
		name: 'Munot Firm',
		image: null,
	},
	{
		name: 'D S Creation',
		image: null,
	},
	{
		name: 'Ya techno solution',
		image: null,
	},
]
