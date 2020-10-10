import { inflictDamage } from './inflict-damage';

let isReady = false;

Hooks.on('ready', () => {
	isReady = true;
});

Hooks.on("renderChatMessage", (app, html, data) => {
	if (isReady) {
		inflictDamage({app, data});
	}
});