import { inflictDamage } from './inflict-damage';
import { log } from './utils';

let isReady = false;

Hooks.on('ready', () => {
	isReady = true;
});

Hooks.on("renderChatMessage", (app, html, data) => {
	log({ game, canvas })
	log(game.users.get(game.userId).character)
	if (isReady) {
		inflictDamage({app, data});
	}
});