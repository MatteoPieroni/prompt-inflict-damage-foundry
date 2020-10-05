function damage({ app = {}, data = {}, }) {
	const type = app.data && app.data.flags && app.data.flags.dnd5e && app.data.flags.dnd5e.roll && app.data.flags.dnd5e.roll.type;
	const targets = app.user && app.user.targets;

	const isDamage = type === 'damage';
	console.log('ciao', {type, targets})
	
	if (!isDamage) {
		return;
	}
	
	if (targets.length === 0) {
		// warn if no target (possibly before)
		return;
	}

	const total = app._roll.total;

	targets.forEach(function(target) {
		const actor = target.actor;
		const isOwner = actor.owner;

		if (!isOwner) {
			return;
		}

		const newHp = actor.data.data.attributes.hp.value - total;
		// resistances?
		// halve damage?
		// modifier

		// if hp is 0?

		return new Promise(resolve => {
			new Dialog({
				title: 'test',
				// should we add the targeted creature here?
				content: '<div>Ciao</div>',
				buttons: {
					apply: {
						label: game.i18n.localize("DND5E.Apply"),
						callback: html => {
							actor.update({ 'data.attributes.hp.value': newHp });
							resolve()
						},
					},
					cancel: {
						label: game.i18n.localize("DND5E.Cancel"),
						callback: () => resolve(null)
					},
				},
				default: "apply",
				close: () => resolve(null)
			}, {}).render(true);
		});
	})

}

Hooks.on("renderChatMessage", (app, html, data) => {
	console.log({app, html, data})
	damage({app, data});
});