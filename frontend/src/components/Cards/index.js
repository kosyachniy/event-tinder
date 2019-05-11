import React from 'react'

import './style.css'
import { getCard } from '../../func/methods'

export default class Cards extends React.Component {
	state = {
		cards: [],
	}

    componentDidMount() {
        getCard(this)

        // 'use strict';

        // console.log(document)

        let tinderContainer = document.querySelector('.tinder');
        let allCards = document.querySelectorAll('.tinder--card');
        let nope = document.getElementById('nope');
        let love = document.getElementById('love');

        // console.log(tinderContainer);
        // console.log(allCards);
        // console.log(nope);
        // console.log(love);

        function initCards(card, index) {
            let newCards = document.querySelectorAll('.tinder--card:not(.removed)');

            newCards.forEach(function(card, index) {
                card.style.zIndex = allCards.length - index;
                card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
                card.style.opacity = (10 - index) / 10;
            });

            tinderContainer.classList.add('loaded');
        }

        initCards();

        allCards.forEach(function(el) {
            let hammertime = window.Hammer(el);

            hammertime.on('pan', function(event) {
                el.classList.add('moving');
            });

            hammertime.on('pan', function(event) {
                if (event.deltaX === 0) return;
                if (event.center.x === 0 && event.center.y === 0) return;

                tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
                tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

                let xMulti = event.deltaX * 0.03;
                let yMulti = event.deltaY / 80;
                let rotate = xMulti * yMulti;

                event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
            });

            hammertime.on('panend', function(event) {
                el.classList.remove('moving');
                tinderContainer.classList.remove('tinder_love');
                tinderContainer.classList.remove('tinder_nope');

                let moveOutWidth = document.body.clientWidth;
                let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

                event.target.classList.toggle('removed', !keep);

                if (keep) {
                    event.target.style.transform = '';
                } else {
                    let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                    let toX = event.deltaX > 0 ? endX : -endX;
                    let endY = Math.abs(event.velocityY) * moveOutWidth;
                    let toY = event.deltaY > 0 ? endY : -endY;
                    let xMulti = event.deltaX * 0.03;
                    let yMulti = event.deltaY / 80;
                    let rotate = xMulti * yMulti;

                    event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                    initCards();
                }
            });
        });

        function createButtonListener(love) {
            return function(event) {
                let cards = document.querySelectorAll('.tinder--card:not(.removed)');
                let moveOutWidth = document.body.clientWidth * 1.5;

                if (!cards.length) return false;

                let card = cards[0];

                card.classNameList.add('removed');

                if (love) {
                    card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
                } else {
                    card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
                }

                initCards();

                event.preventDefault();
            };
        }

        let nopeListener = createButtonListener(false);
        let loveListener = createButtonListener(true);

        nope.addEventListener('click', nopeListener);
        love.addEventListener('click', loveListener);

	}

	render() {
		return (
			<div>
				{ JSON.stringify(this.state.cards) }
				<div class="tinder">
					<div class="tinder--status">
						<i class="fa fa-remove"></i>
						<i class="fa fa-heart"></i>
					</div>

					<div class="tinder--cards">
						<div class="tinder--card">
						<img src="https://placeimg.com/600/300/people"/>
						<h3>Demo card 1</h3>
						<p>This is a demo for Tinder like swipe cards</p>
						</div>
						<div class="tinder--card">
						<img src="https://placeimg.com/600/300/animals"/>
						<h3>Demo card 2</h3>
						<p>This is a demo for Tinder like swipe cards</p>
						</div>
						<div class="tinder--card">
						<img src="https://placeimg.com/600/300/nature"/>
						<h3>Demo card 3</h3>
						<p>This is a demo for Tinder like swipe cards</p>
						</div>
						<div class="tinder--card">
						<img src="https://placeimg.com/600/300/tech"/>
						<h3>Demo card 4</h3>
						<p>This is a demo for Tinder like swipe cards</p>
						</div>
						<div class="tinder--card">
						<img src="https://placeimg.com/600/300/arch"/>
						<h3>Demo card 5</h3>
						<p>This is a demo for Tinder like swipe cards</p>
						</div>
					</div>

					<div class="tinder--buttons">
						<button id="nope"><i class="fa fa-remove"></i></button>
						<button id="love"><i class="fa fa-heart"></i></button>
					</div>
				</div>
			</div>
		)
	}
}