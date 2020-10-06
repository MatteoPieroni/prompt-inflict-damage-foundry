import dialog from './dialog.html';

import { processDamage } from '../utils';

const TEMPLATE = 'modules/prompt-inflict-damage/dist/dialog.html';

export async function showInfo({ total, target }) {
	const actor = target.actor;
	const isOwner = actor.owner;

	console.log(actor.permission)

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