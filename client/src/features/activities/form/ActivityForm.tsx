import React, { useState, FormEvent, useContext } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
	activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialFormState }) => {
	const activityStore = useContext(ActivityStore);
	const {
		createActivity,
		editActivity,
		submitting,
		cancelFormOpen,
	} = activityStore;
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
					name="category"
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
					loading={submitting}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button
					onClick={cancelFormOpen}
					floated="right"
					type="submit"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);
