import axios from 'axios'

import api from './api'


// Получить карточки

export function getCard(that, data={}) {
	const handlerSuccess = (other, res) => {
        // console.log(res) // !

        other.setState({cards: res['events']})

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

					el.remove();
                }

            });
        });

        function createButtonListener(love) {
            return function(event) {
                let cards = document.querySelectorAll('.tinder--card:not(.removed)');
                let moveOutWidth = document.body.clientWidth * 1.5;

                if (!cards.length) return false;

                let card = cards[0];

                card.classList.add('removed');

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

	api(that, 'get', data, handlerSuccess)
}

export function getGeo(that, data={}) {
	const handlerSuccess = async (other, res) => {
		function addMarkersToMap(map, lat, lng) {
			let parisMarker = new window.H.map.Marker({lat, lng});
			map.addObject(parisMarker);
        }

        function markered(geo) {
            // console.log(geo)
            addMarkersToMap(other.map, geo['Latitude'], geo['Longitude'])
        }

        // let r = []

        for (let i=0; i<res['events'].length; i++) {
            try {
                let el = res['events'][i]
                let elm = await axios.get('https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=' + el['location'] + '&app_id=qa0WJfBASLFPiWJIm8zA&app_code=CSg50IevfYpGuIaHzNjj_Q&gen=8')
                let geo = JSON.parse(elm['request']['response'])['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']

                res['events'][i]['geo'] = {
                    'lant': geo['Latitude'],
                    'long': geo['Longitude'],
                }
                // console.log(res['events'][i]['geo'])
                // r.push(geo)

                markered(geo)
                // console.log(res['events'])
            }
            catch (err) {
                console.error(err)
            }
        }

        // other.props.markers = JSON.stringify(res['events'])
        other.setState({markers: JSON.stringify(res['events'])})

        // res['events'].map(el => {
        //     axios.get('https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=' + el['location'] + '&app_id=qa0WJfBASLFPiWJIm8zA&app_code=CSg50IevfYpGuIaHzNjj_Q&gen=8').then(elm => {
        //         try {
        //             let geo = JSON.parse(elm['request']['response'])['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']
        //             markered(geo)
        //             el['geo'] = geo
        //         } catch {
        //         }
               
        //     })
        // })
        
        // // 
	}

	api(that, 'get', data, handlerSuccess)
}
