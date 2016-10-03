 import { Observable } from 'rx';
 import $ from "jquery";

 const API = 'https://api.github.com/users';
 const refreshButton = document.querySelector('#refresh');
 const closeButton1 = document.querySelector('#closeButton1');
 const closeButton2 = document.querySelector('#closeButton2');
 const closeButton3 = document.querySelector('#closeButton3');

 const closeButton1Stream = Observable.fromEvent(closeButton1, 'click');
 const closeButton2Stream = Observable.fromEvent(closeButton2, 'click');
 const closeButton3Stream = Observable.fromEvent(closeButton3, 'click');
 const refreshClickStream = Observable.fromEvent(refreshButton, 'click');

 const requestStream = refreshClickStream.startWith('startup click')
     .map(() => {
         const randomOffset = Math.floor(Math.random() * 500);
         return `${API}?since=${randomOffset}`;
     });

 const responseStream = requestStream.flatMap((requestUrl) => {
     return Observable.fromPromise($.getJSON(requestUrl));
 });

 responseStream.subscribe((users) => { console.log(users) });

 const createSuggestionStream = (closeClickStream) => closeClickStream
     .combineLatest(responseStream, (click, users) => users[Math.floor(Math.random() * users.length)])
     .merge(refreshClickStream.map(() => null))
     .startWith(null);
 const suggestion1Stream = createSuggestionStream(closeButton1Stream);
 const suggestion2Stream = createSuggestionStream(closeButton2Stream);
 const suggestion3Stream = createSuggestionStream(closeButton3Stream);

 const renderSuggestion = (suggestion, selector) => {
     const elem = $(selector);
     if (suggestion === null) {
         elem.css('visibility', 'hidden');
     } else {
         const { login } = suggestion;
         elem.css('visibility', 'visible');
         console.log(login);
         $('.login', selector).html(`
             	<div>
					${login}
				</div>
		`);
     }
 }
 suggestion1Stream.subscribe((suggestion) => renderSuggestion(suggestion, '.suggestion1'));
 suggestion2Stream.subscribe((suggestion) => renderSuggestion(suggestion, '.suggestion2'));
 suggestion3Stream.subscribe((suggestion) => renderSuggestion(suggestion, '.suggestion3'));
