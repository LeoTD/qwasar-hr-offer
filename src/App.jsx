import React from 'react';
import styles from './App.scss';
import Popup from './Popup.jsx';

import { useState } from 'react';

/*
possible layout:
  section to create offer object
  section to see offers made
  section to create a link to an offer
*/

function App() {
	var job_details = {
		supervisor: 'el jefe',
		direct_reports: 'the squad',
		title: 'dat boi',
		team: 'coder gang',
		organization: 'code all day'
	};

	var monetary = {
		salary: 120000, //currency = russian ruble
		equity: 100,
		bonus: 1500
	};

	var monetary2 = {
		salary: 130000, //currency = russian ruble
		equity: 200,
		bonus: 1800
	};

	var non_monetary = {
		flexibility: 'Hybrid work days',
		time_off: 'Extra day off for e.g. birthdays',
		career_growth: 'Credit for Udemy courses',
		volunteer: '1 Volunteer event every 2 month'
	};

	const [offers, setOffers] = useState([
		{
			id: 1,
			name: 'Mammadu',
			job: job_details,
			monetary: monetary,
			non_monetary: non_monetary
		},
		{
			id: 2,
			name: 'John',
			job: job_details,
			monetary: monetary2,
			non_monetary: non_monetary
		},
		{
			id: 3,
			name: 'Leo',
			job: job_details,
			monetary: monetary2,
			non_monetary: non_monetary
		},
		{
			id: 4,
			name: 'Iana',
			job: job_details,
			monetary: monetary2,
			non_monetary: non_monetary
		},
		{
			id: 5,
			name: 'Quang',
			job: job_details,
			monetary: monetary2,
			non_monetary: non_monetary
		}
	]);

	const createMonetaryPackage = (salary, equity, bonus) => {
		return {
			salary: salary,
			equity: equity,
			bonus: bonus
		};
	};

	const createNonMonetaryPackage = (
		flexibility,
		time_off,
		career_growth,
		volunteer
	) => {
		return {
			flexibility: flexibility,
			time_off: time_off,
			career_growth: career_growth,
			volunteer: volunteer
		};
	};

	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const [inputs, setInputs] = useState({});

	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleSubmit = event => {
		event.preventDefault();
		offers.push({
			id: offers.length + 1,
			name: inputs.name,
			job: job_details,
			monetary: createMonetaryPackage(
				inputs.salary,
				inputs.equity,
				inputs.bonus
			),
			non_monetary: non_monetary
		});
		setOffers(offers);
		togglePopup();
		setInputs({});
	};

	return (
		<div className="container">
			<h2>HR Offer Management</h2>

			<input
				className="new"
				type="button"
				value="New Offer"
				onClick={togglePopup}
			/>
			{isOpen && (
				<Popup
					content={
						<>
							<form onSubmit={handleSubmit}>
								<label>
									<input
                    autocomplete="off"
										placeholder="Name"
										type="text"
										name="name"
										value={inputs.name || ''}
										onChange={handleChange}
									/>
								</label>
								<label>
									<input
										placeholder="Salary"
										type="number"
										name="salary"
										value={inputs.salary || ''}
										onChange={handleChange}
									/>
								</label>
								<label>
									<input
										placeholder="Equity"
										type="number"
										name="equity"
										value={inputs.equity || ''}
										onChange={handleChange}
									/>
								</label>
								<label>
									<input
										placeholder="Bonus"
										type="number"
										name="bonus"
										value={inputs.bonus || ''}
										onChange={handleChange}
									/>
								</label>
								<input type="submit" />
							</form>
						</>
					}
					handleClose={togglePopup}
				/>
			)}

			<ul className="responsive-table">
				<li className="table-header">
					<div className="col col-1">Id</div>
					<div className="col col-2">Candidate Name</div>
					<div className="col col-3">Salary</div>
					<div className="col col-4">Equity</div>
					<div className="col col-5">Bonus</div>
				</li>
				{offers.map(offer => {
					return (
						<li className="table-row">
							<div className="col col-1" data-label="Id">
								{offer.id}
							</div>
							<div className="col col-2" data-label="Candidate Name">
								{offer.name}
							</div>
							<div className="col col-3" data-label="Salary">
								{offer.monetary.salary}
							</div>
							<div className="col col-4" data-label="Equity">
								{offer.monetary.equity}
							</div>
							<div className="col col-5" data-label="Bonus">
								{offer.monetary.bonus}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
