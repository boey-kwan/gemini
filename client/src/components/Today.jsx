import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../App.css";
import Task from "./Task";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

async function getData({ username, date }) {
	console.log(username, date);
	return {
		status: true,
		message: "Success",
		data: [
			{
				taskId: 1,
				title: "Task 1",
				fromTime: "12:00",
				toTime: "13:00",
				location: "Home",
				description: "Description 1",
				imgUrl: "url",
			},
			{
				taskId: 2,
				title: "Task 2",
				from: "14:00",
				to: "15:00",
				location: "Home",
				description: "Description 2",
				imgUrl: "url",
			},
		],
	};
}
// async function getData({ username, date }) {
// 	const url = `http://localhost:5000/api/tasks/${username}/${date}`;

// 	const response = await fetch(url);

// 	/**
// 	 * response = {
// 	 * 	status: true,
// 	 * message: "Success",
// 	 * 	data: [
// 	 * 		{
// 	 * 			taskId: 1,
// 	 * 				title: "Task 1",
// 	 * 				from, to, location, description, imgUrl
// 	 * 		},
// 	 * 		{
// 	 * 			taskId: 2,
// 	 * 				title: "Task 1",
// 	 * 				from, to, location, description, imgUrl
// 	 * 		}
// 	 * ]
// 	 * }
// 	 */

// 	return await response.json();
// }
export default function Today() {
	// Determine the user and the date
	const location = useLocation();
	const dateString = location.pathname.split("/")[2].replace(/%20/g, " ");
	const username = location.pathname.split("/")[3];
	const date = new Date(dateString);

	// Determine previous and next dates
	const yesterday = new Date();
	yesterday.setDate(date.getDate() - 1);
	const yesterdayString = yesterday.toDateString();
	const tomorrow = new Date();
	tomorrow.setDate(date.getDate() + 1);
	const tomorrowString = tomorrow.toDateString();

	// Determine real today's date
	const today = new Date();
	const todayString = today.toDateString();

	// TODO: Grab all tasks in this day.
	const [taskList, setTaskList] = useState([1, 2]);

	// TODO: Initialize to the first ID in the list.
	const [currentTaskId, setCurrentTaskId] = useState(1);

	function updateCurrentTaskId(id) {
		setCurrentTaskId(id);
		console.log("current task: " + id);
	}

	function deleteTaskWithId(id) {
		console.log(taskList.filter((value) => value !== id));
		setTaskList(taskList.filter((value) => value !== id));
	}

	useEffect(() => {
		async function fetchData() {
			const response = await getData({ username, date: dateString });

			setTaskList(response.data);

			console.log(response.data);
		}
		fetchData();
	}, []);
	return (
		<div>
			<div className="row">
				<div className="body-left">
					<button className="day-navigation">
						<Link to={`/date/${yesterdayString}/${username}`}>
							{"< " + yesterdayString}{" "}
						</Link>
					</button>
				</div>

				<div className="body-center scroll">
					{dateString == todayString ? (
						<h1 className="h1">Today's To-Do List</h1>
					) : (
						<h1 className="h1">To-Do List</h1>
					)}
					<h2 className="h2">{dateString}</h2>
					<div className="task-list">
						{taskList.length ? (
							taskList.map((value) => {
								return (
									<Task
										key={value}
										id={value}
										showSidebar={currentTaskId == value}
										onClick={updateCurrentTaskId}
										deleteTask={deleteTaskWithId}
									/>
								);
							})
						) : (
							<h2
								style={{
									fontStyle: "italic",
									opacity: 0.5,
									textAlign: "center",
								}}
							>
								Create a task to get started!
							</h2>
						)}
					</div>

					{/* Add a task button */}
					<div
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<button
							className="row main-button"
							style={{
								width: "fit-content",
							}}
							onClick={() => {
								setTaskList([...taskList, taskList.length + 1]);
								setCurrentTaskId(taskList.length + 1);
							}}
						>
							<AddOutlinedIcon />
							<div>Add task</div>
						</button>
					</div>
				</div>

				<div className="body-right">
					<button className="day-navigation">
						<Link to={`/date/${tomorrowString}/${username}`}>
							{tomorrowString + " >"}
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
