const TEMPLATE = 'modules/prompt-inflict-damage/dist/dialog.html';

function processDamage({ hp, damage, isHalved, modifier }) {
	const initialDamage = isHalved ? Math.floor(damage / 2) : damage;
	const trimmedModifier = typeof modifier === 'string' && modifier.replaceAll(' ', '');
	const finalModifiers = trimmedModifier && trimmedModifier.split(/(?<=[+-][0-9]+)/i);

	let modifiedDamage = initialDamage;

	if (finalModifiers.length > 0) {
		finalModifiers.forEach(function(modifier) {
			modifiedDamage = +modifiedDamage + +modifier;
		});
	}

	return modifiedDamage > 0 ? hp - modifiedDamage : hp;
}

async function showInfo({ total, target }) {
	const actor = target.actor;
	const isOwner = actor.owner;

	if (!isOwner) {
		return;
	}

	const name = actor?.data?.name;
	const hp = actor?.data?.data?.attributes?.hp?.value;

  let dialogData = {
		initialformula: `${hp} - ${total}`,
		name,
  };
  const content = await renderTemplate(TEMPLATE, dialogData);
	// resistances?

	// if hp is 0?

	return new Promise(resolve => {
		new Dialog({
			title: game.i18n.localize("PID.InflictDamageQuestion"),
			// should we add the targeted creature here?
			content,
			buttons: {
				inflict: {
					label: game.i18n.localize("PID.Inflict"),
					callback: html => {
						const isHalved = html[0].querySelector('form').querySelector('[name="halved"]').checked;
						const modifier = html[0].querySelector('form').querySelector('[name="modifier"]').value;

						actor.update({ 'data.attributes.hp.value': processDamage({ hp, damage: total, isHalved, modifier }) });
						resolve()
					},
				},
				cancel: {
					label: game.i18n.localize("PID.Cancel"),
					callback: () => resolve(null)
				},
			},
			default: "inflict",
			close: () => resolve(null)
		}, {}).render(true);
	});
}

async function damage({ app = {}, data = {}, }) {
	const type = app?.data?.flags?.dnd5e?.roll?.type;
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
		showInfo({ total, target })
	})
}

Hooks.on("renderChatMessage", (app, html, data) => {
	console.log({app, html, data})
	damage({app, data});
});