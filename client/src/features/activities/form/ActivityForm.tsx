import React, { useState, FormEvent } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
	setEditMode: (editMode: boolean) => void;
	activity: IActivity;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
}
export const ActivityForm: React.FC<IProps> = ({
	setEditMode,
	activity: initialFormState,
	createActivity,
	editActivity,
}) => {
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: "",
				title: "",
				category: "",
				description: "",
				date: "",
				city: "",
				venue: "",
			};
		}
	};

	const [activity, setActivity] = useState<IActivity>(initializeForm);

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity);
		} else {
			editActivity(activity);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name="title"
					placeholder="Title"
					value={activity.title}
				/>
				<Form.TextArea
					onChange={handleInputChange}
					rows={2}
					name="description"
					placeholder="Description"
					value={activity.description}
				/>
				<Form.Input
					placeholder="Category"
					value={activity.category}
					onChange={handleInputChange}
				/>
				<Form.Input
					type="datetime-local"
					name="date"
					onChange={handleInputChange}
					placeholder="Date"
					value={activity.date}
				/>
				<Form.Input
					placeholder="City"
					value={activity.city}
					name="city"
					onChange={handleInputChange}
				/>
				<Form.Input
					placeholder="Venue"
					value={activity.venue}
					name="venue"
					onChange={handleInputChange}
				/>
				<Button
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button
					onClick={() => setEditMode(false)}
					floated="right"
					type="submit"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
};