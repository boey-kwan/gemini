import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';

// Get the directory path of the current module
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const MODEL_NAME = 'gemini-1.5-pro-latest'
const API_KEY = process.env.G_KEY


function generateLastWeekTimestamp() {
	const oneWeekMs = 7 * 24 * 60 * 60 * 1000
	return Date.now() - Math.floor(Math.random() * oneWeekMs)
}

function generateDuration() {
	const maxTaskDuration = 60 * 60 * 1000 // 3 hours
	return Math.floor(Math.random() * maxTaskDuration)
}

// define example tasks
const taskList = [
	{
		title: 'Fed the fish',
		description: 'I fed the fish and they ate the food. They seemed happy.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Sitting room',
		photoIDs: ['photo_1', 'photo_2'],
	},
	{
		title: 'Folded the clothes',
		description:
			'The clothes were in a hamper at the foot of the bed. I folded them and put them away in the closet.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Bedroom',
		photoIDs: [],
	},
	{
		title: 'Watered the plants',
		description:
			'I made sure to water each plant according to its needs. The succulents got a little less water than the ferns.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Balcony',
		photoIDs: ['photo_3', 'photo_4'],
	},
	{
		title: 'Practiced playing the guitar',
		description:
			'I worked on a new song and practiced some scales to improve my technique.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Living room',
		photoIDs: ['photo_5'],
	},
	{
		title: 'Went for a jog',
		description:
			'I enjoyed the fresh air and the feeling of my feet hitting the pavement. It was a good workout.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Park',
		photoIDs: [],
	},
	{
		title: 'Prepared dinner',
		description:
			'I cooked a delicious meal and set the table for a cozy dinner at home. The food was tasty and filling.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Kitchen',
		photoIDs: [],
	},
	{
		title: 'Read a book',
		description:
			'I got lost in the pages of a novel and escaped into a different world. It was a great way to relax and unwind.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Reading nook',
		photoIDs: ['photo_6'],
	},
	{
		title: 'Wrote code',
		description:
			'I worked on a personal project and made progress on a new feature.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Home office',
		photoIDs: [],
	},
	{
		title: 'Called a friend',
		description:
			'I called a friend to catch up and chat about life. It was nice to hear their voice and share stories.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Anywhere',
		photoIDs: [],
	},
	{
		title: 'Took a nap',
		description:
			'I recharged my energy with a short nap and woke up feeling refreshed and ready to tackle the day.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Bedroom',
		photoIDs: [],
	},
	{
		title: 'Attended a yoga class',
		description:
			'I stretched and strengthened my body in a yoga class. It was a great way to relax and unwind.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Yoga studio',
		photoIDs: [],
	},
	{
		title: 'Watched a movie',
		description:
			'We watched a movie together and enjoyed popcorn and snacks. It was a fun and relaxing evening at home.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Living room',
		photoIDs: [],
	},
	{
		title: 'Went grocery shopping',
		description:
			'I made a list and stocked up on essentials for the week ahead. The fridge is now full of fresh produce and snacks.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Supermarket',
		photoIDs: [],
	},
	{
		title: 'Practiced meditation',
		description:
			'I sat in silence and focused on my breath to calm my mind and find inner peace. It was a grounding experience.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Quiet room',
		photoIDs: [],
	},
	{
		title: 'Planned my next vacation',
		description:
			'I researched destinations and activities for an upcoming trip. It was exciting to dream about new adventures.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Home office',
		photoIDs: [],
	},
	{
		title: 'Cleaned the house',
		description:
			'I decluttered and tidied up the living spaces to create a clean and organized environment. I like the feeling of a clean house.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Everywhere',
		photoIDs: [],
	},
	{
		title: 'Practiced a new language',
		description:
			'I practiced vocabulary and grammar exercises to improve my language skills. It was challenging but rewarding.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Study room',
		photoIDs: [],
	},
	{
		title: 'Volunteered at a local charity',
		description:
			'I helped out at a charity event and made a positive impact in the community. It felt good to give back.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Charity center',
		photoIDs: [],
	},
	{
		title: 'Hosted a game night',
		description:
			'I invited friends over for a game night and we played board games and card games. It was a fun and social evening.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Living room',
		photoIDs: [],
	},
	{
		title: 'Explored a new hiking trail',
		description:
			'I hiked through the forest and enjoyed the fresh air and beautiful scenery. It was a great way to connect with nature.',
		startTime: generateLastWeekTimestamp(),
		endTime: 0,
		location: 'Nature reserve',
		photoIDs: [],
	},
]

async function runChat() {
	const genAI = new GoogleGenerativeAI(API_KEY)
	const model = genAI.getGenerativeModel({ model: MODEL_NAME })

	const generationConfig = {
		temperature: 1,
		topK: 0,
		topP: 0.95,
		maxOutputTokens: 8192,
	}
	// const generationConfig = {
	//   temperature: 1,
	//   topK: 0,
	//   topP: 0.95,
	//   maxOutputTokens: 8192,
	// };

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	]
	// const safetySettings = [
	//   {
	//     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
	//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	//   },
	//   {
	//     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
	//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	//   },
	//   {
	//     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
	//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	//   },
	//   {
	//     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
	//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	//   },
	// ];

	// const chat = model.startChat({
	// 	generationConfig,
	// 	safetySettings,
	// 	history: [],
	// })

	// const result = await chat.sendMessage(
	// 	'Tell me about Pokemon in under 100 words'
	// )
	// const response = result.response
	// console.log(response.text())
	// const chat = model.startChat({
	//   generationConfig,
	//   safetySettings,
	//   history: [
	//   ],
	// });

	let prompt =
		'Help me summarize my accomplishments. I will provide you with instructions, so read them carefully.\n\nThe significance of a task depends upon effort required and overall impact to myself and others. Using this framework, label every task according to its significance, assigning a numerical ranking from 1 (highest significance) to 3 (lowest significance). Arrange the tasks in order and show me how you labeled them before continuing.\n\nNext, while focusing on the most significant tasks available, determine 3-5 categories to which tasks can belong.\n\nGenerate summaries of my accomplishments in each of these categories and address me directly in the second person when doing so.'

	taskList.forEach((task) => {
		prompt += `\n\nTask: ${task.title}\nDescription: ${
			task.description
		}\nStart Time: ${new Date(
			task.startTime
		).toLocaleString()}\nEnd Time: ${new Date(
			task.endTime
		).toLocaleString()}\nLocation: ${
			task.location
		}\nPhoto IDs: ${task.photoIDs.join(', ')}`
	})

	const res = await model.generateContent(prompt)
	// const result = await chat.sendMessage("Tell me about Pokemon in under 100 words");

	console.log(res.response.text())
}

runChat()
