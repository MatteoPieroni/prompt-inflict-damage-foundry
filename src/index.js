import { inflictDamage } from './inflict-damage';

let isReady = false;

Hooks.on('ready', () => {
	isReady = true;

	/**
	 * The domain on which the flag will be looked up
	 */
	game.settings.register("prompt-inflict-damage", "flagDomain", {
		name : game.i18n.localize('PID.SettingFlagName'),
		hint : game.i18n.localize('PID.SettingFlagNameHint'),
		scope : 'world',
		config : true,
		type : String,
		default : game.system.id,
	});
	
});

Hooks.on("renderChatMessage", (app, html, data) => {
	if (isReady) {
		inflictDamage({app, data});
	}
});