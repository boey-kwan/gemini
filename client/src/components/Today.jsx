import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../App.css";
import Task from "./Task";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

let myData = [
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
		fromTime: "14:00",
		toTime: "15:00",
		location: "Home",
		description: "Description 2",
		imgUrl: "url",
	},
	{
		taskId: 3,
		title: "Task 3",
		fromTime: "16:00",
		toTime: "17:00",
		location: "Home",
		description: "Description 3",
		imgUrl: "url",
	}
]

function getData({ username, date }) {

	const data2 = myData.map((x) => ([x.taskId, x]))
	return {
		status: true,
		message: "Success",
		data: Object.fromEntries(data2)
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

function updateField(id, fieldName, value) {
	let copy = {...myData[0]};

	for (let i = 0; i < myData.length; i++) {
		if (myData[i].taskId == id) {
			// console.log("Updating field: " + fieldName + " to " + value);
			let copy = {...myData[i]};
			switch(fieldName) {
				case "title": 
					copy.title = value;
					break;
				case "fromTime":
					copy.fromTime = value;
					break;
				case "toTime":
					copy.toTime = value;
					break;
				case "location":
					copy.location = value;
					break;
				case "description":
					copy.description = value;
					break;
				case "imgUrl":
					copy.imgUrl = value;
					break;
			}
		}
		myData[i] = copy;
	}
}

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

	let data = null
	// getData({username:"username", date:"date"}).then(x => 
	// 	{data = x.data;
	// 	console.log(data);}
	// )
	
	// TODO: Grab all tasks in this day.
	const [taskList, setTaskList] = useState(getData({username:"username", date:"date"}).data)

	// console.log("A", getData({username:"username", date:"date"}))
	// console.log("B", getData({username:"username", date:"date"}).data)
	// console.log("data", data)
	// console.log("as list", Object.assign([], {...taskList}))
	

	function updateTaskList(id, fieldName, value) {
		// console.log("ID", id)
		// console.log("fieldName", fieldName)
		// console.log("value", value)
		const task = taskList[id];
		switch(fieldName) {
			case "title": 
				task.title = value;
				// console.log("Updated to: ", task.title);
				break;
			case "fromTime":
				task.fromTime = value;
				break;
			case "toTime":
				task.toTime = value;
				break;
			case "location":
				task.location = value;
				break;
			case "description":
				task.description = value;
				break;
			case "imgUrl":
				task.imgUrl = value;
				break;
		}
		setTaskList({id: task, ...taskList});
	}

	// TODO: Initialize to the first ID in the list.
	const [currentTaskId, setCurrentTaskId] = useState(1);

	function updateCurrentTaskId(id) {
		setCurrentTaskId(id);
		// console.log("current task: " + id);
	}

	function deleteTaskWithId(id) {
		// console.log(taskList.filter((value) => value !== id));
		setTaskList(taskList.filter((value) => value !== id));
	}

	useEffect(() => {
		async function fetchData() {
			const response = await getData({ username, date: dateString });

			setTaskList(response.data);

			// console.log(response.data);
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
						{Object.keys(taskList).length ? (
							Object.assign([], {...taskList}).map(value => {

								console.log("value", value);

								return (
									<Task
										key={value.taskId}
										id={value.taskId}
										value={value}
										showSidebar={currentTaskId == value.taskId}
										onClick={updateCurrentTaskId}
										deleteTask={deleteTaskWithId}
										updateTaskList={updateTaskList}
										showFields={{
											description: value.description.length > 0,
											time: value.fromTime.length > 0 || value.toTime.length > 0,
											location: value.location.length > 0,
											image: value.imgUrl.length > 0,
										}}
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
