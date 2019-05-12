import React from 'react'

import './style.css'


export default class Timeline extends React.Component {
	render() {
		return (
			<div class="card">
			<ul class="timeline">
				<li class="timeline__item">
				<div class="timeline__step">
					<div
					class="timeline__step__marker timeline__step__marker--blue"
					></div>
				</div>
				<div class="timeline__time">
					08:00
				</div>
				<div class="timeline__content">
					<div class="timeline__title">
					Завтрак
					</div>
					<ul class="timeline__points">
					<li>Пицца ждет вас на кофепойнте</li>
					</ul>
				</div>
				</li>

				<li class="timeline__item">
				<div class="timeline__step">
					<div
					class="timeline__step__marker timeline__step__marker--blue"
					></div>
				</div>
				<div class="timeline__time">
					10:00
				</div>
				<div class="timeline__content">
					<div class="timeline__title">
					Контрольная точка
					</div>
					<ul class="timeline__points">
					<li>Кто-нибудь её заметил?</li>
					</ul>
				</div>
				</li>

				<li class="timeline__item">
				<div class="timeline__step">
					<div
					class="timeline__step__marker timeline__step__marker--red"
					></div>
				</div>
				<div class="timeline__time">
					14:00
				</div>
				<div class="timeline__content">
					<div class="timeline__title">
					Презентация проектов
					</div>

					<ul class="timeline__points">
					<li>Вы отлично справляетесь!</li>
					</ul>
				</div>
				</li>

				<li class="timeline__item">
				<div class="timeline__step">
					<div
					class="timeline__step__marker timeline__step__marker--blue"
					></div>
				</div>
				<div class="timeline__time">
					15:30
				</div>
				<div class="timeline__content">
					<div class="timeline__title">
					Награждение победителей
					</div>
					<ul class="timeline__points">
					<li></li>
					</ul>
				</div>
				</li>
			</ul>
		</div>
		)
	}
}