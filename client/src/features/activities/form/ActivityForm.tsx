import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
	id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const activityStore = useContext(ActivityStore);
	const {
		createActivity,
		editActivity,
		submitting,
		activity: initialFormState,
		loadActivity,
		clearActivity,
	} = activityStore;

	const [activity, setActivity] = useState<IActivity>({
		id: "",
		title: "",
		category: "",
		description: "",
		date: "",
		city: "",
		venue: "",
	});

	useEffect(() => {
		if (match.params.id && activity.id.length === 0) {
			loadActivity(match.params.id).then(
				() => initialFormState && setActivity(initialFormState)
			);
		}
		return () => {
			clearActivity();
		};
	}, [
		match.params.id,
		loadActivity,
		clearActivity,
		initialFormState,
		activity.id.length,
	]);

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity).then(() =>
				history.push(`/activities/${newActivity.id}`)
			);
		} else {
			editActivity(activity).then(() =>
				history.push(`/activities/${activity.id}`)
			);
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
					onClick={() => history.push("/activities")}
					floated="right"
					type="submit"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);
