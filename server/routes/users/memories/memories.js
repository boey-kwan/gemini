import express from 'express'
import { prisma } from '../../../db/prismaClient.js'
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

router.get('/', async (req, res) => {
	const data = await prisma.task.findMany();
	return res.json({
		data
	})
});

router.post('/memory', async (req, res) => {
	// period=day, week, month

	// get Data
	/**
	 * prisma.tasks.findMany({....})
	 */

	// sum up the tasks ...
	// send to gemini

	// get response from gemini

	// const { userID, listOfDates } = req.query
	const userID = 'demo';
	const listOfDates = 'day';

	if (!userID || !listOfDates) {
		return res.status(400).json({
			status: false,
			message: 'Missing userID or listOfDates',
		})
	}

	try {
        let startDate, endDate;

        // Determine start and end dates based on the period
        switch (listOfDates) {
            case 'day':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 1);
                endDate = new Date();
                break;
            case 'week':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                endDate = new Date();
                break;
            case 'month':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                endDate = new Date();
                break;
            default:
                return res.status(400).json({
                    status: false,
                    message: 'Invalid period specified',
                });
        }

        // Query tasks for the specified date range and userID
        const tasks = await prisma.task.findMany(
            // where: {
            //     day: {
            //         userId: parseInt(userID),
            //         date: {
            //             gte: startDate.toISOString(),
            //             lte: endDate.toISOString(),
            //         },
            //     },
            // },
            // include: {
            //     day: true,
            // },
        );

		// Console log the query result
        console.log('Query result:', tasks);

        return res.status(200).json({
            status: true,
            message: 'Successful',
            data: tasks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }

	try {
		// Convert listOfDates from string to array if necessary
		const dates = Array.isArray(listOfDates)
			? listOfDates
			: JSON.parse(listOfDates)

		const userDays = await prisma.day.findMany({
			where: {
				userId: parseInt(userID),
				date: {
					in: dates.map((date) => new Date(date)),
				},
			},
			include: {
				tasks: true, // TODO: probably maybe needs adjustment
			},
		})

		return res.status(200).json({
			status: true,
			message: 'successful',
			data: userDays,
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			status: false,
			message: error.message,
		})
	}
});


async function getData() {

	const userId = 1;
	const listOfDates = 'day';

	if (!userId || !listOfDates) {
		return res.status(400).json({
			status: false,
			message: 'Missing userID or listOfDates',
		})
	}

	try {
        let startDate, endDate;

        // Determine start and end dates based on the period
        switch (listOfDates) {
            case 'day':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 1);
                endDate = new Date();
                break;
            case 'week':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                endDate = new Date();
                break;
            case 'month':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                endDate = new Date();
                break;
            default:
                return res.status(400).json({
                    status: false,
                    message: 'Invalid period specified',
                });
        }

		const tasks = await prisma.task.findMany(
			// where: {
				// day: { 
					
						// user: {
						// 	id: userId
						// },
						// date: {
						// 	startDate,
							
						// },
					
				// },
			// },
			// include: {
			// 	day: true, 
			// },
		);
		
	
		// Console log the query result
        console.log('Query result:', tasks);
    } catch (error) {
        console.error(error);

    }

}

// getData();


// const tasksForUserOnDay = async (userId, date) => {
// 	const user = await prisma.user.findUnique({
// 	  where: { id: userId },
// 	  include: {
// 		days: {
// 		  where: { date: date },
// 		  include: {
// 			tasks: true,
// 		  },
// 		},
// 	  },
// 	});
	
// 	return user?.days[0]?.tasks || [];
//   };
  
//   // Usage example
//   const userId = 1;
//   const date = new Date("2024-05-01T00:00:00Z"); // Replace with the desired date
//   const tasks = await tasksForUserOnDay(userId, date);
//   console.log(tasks);
  


export default router
