const listElements = document.querySelectorAll('li');
const timeTrackingContent = document.querySelector('.time-tracking-content');
let timeTrackingData = [];
let previousSelectedTimeframe = '';
const defaultTimeframeSummaryValue = 'weekly';
let timeframeValue = 'Week';

async function fetchData() {
	const response = await fetch('./data.json');
	//assign data outside so it can be used in handleButtonClick
	timeTrackingData = await response.json();

	//on load, display default value aka daily
	timeTrackingData.forEach((item) => {
		return appendItem(item, defaultTimeframeSummaryValue);
	});

	document
		.querySelector(`#${defaultTimeframeSummaryValue}`)
		.classList.add('selected');
	previousSelectedTimeframe = defaultTimeframeSummaryValue;
}

fetchData();

//add same event listener to each list item
listElements.forEach((listItem) => {
	listItem.addEventListener('click', handleButtonClick);
});

const appendItem = (item, timeframeSelected) => {
	let iconName = item.title.includes(' ')
		? item.title.replace(' ', '-').toLowerCase()
		: item.title.toLowerCase();

	console.log(item.title.toLowerCase());
	timeTrackingContent.innerHTML += `
	<div class='activity ${iconName}'>
		<div class='icon-container '>
			<img class='icon ${iconName}' src=/images/icon-${iconName}.svg />
		</div>
	
		<div class='activity-list'>
			<div class='activity-heading-container'>
				<h2>${item.title}</h2>
				<img src="/images/icon-ellipsis.svg" alt="Ellipsis" />
			</div>
			<div class="time-summary">
				<p class="current">${item.timeframes[timeframeSelected].current}hrs</p>
				<p class="previous">Last ${timeframeValue} - ${item.timeframes[timeframeSelected].previous}hrs</p>
			</div></div>
		
	</div>
	`;

	return;
};

function handleButtonClick(e) {
	let currentTimeframeSelected = e.currentTarget.id;

	switch (currentTimeframeSelected) {
		case 'daily':
			timeframeValue = 'Day';
			break;
		case 'weekly':
			timeframeValue = 'Week';
			break;
		case 'monthly':
			timeframeValue = 'Month';
			break;
		default:
			break;
	}

	document
		.querySelector(`#${previousSelectedTimeframe}`)
		.classList.remove('selected');

	document
		.querySelector(`#${currentTimeframeSelected}`)
		.classList.add('selected');
	previousSelectedTimeframe = currentTimeframeSelected;

	//clear out the previous selection before rendering the new selection
	timeTrackingContent.innerHTML = '';

	timeTrackingData.forEach((item) => {
		return appendItem(item, currentTimeframeSelected);
	});
}
