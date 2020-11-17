import dialog from './dialog.html';

import { processDamage, log } from '../utils';
import { checkShouldShowDialog } from '../user-identity/user-identity';

const TEMPLATE = 'modules/prompt-inflict-damage/dist/dialog.html';

export async function showInfo({ total, target }) {
	const actor = target.actor;
	const isOwner = actor.owner;

	if (
		!isOwner ||
		!actor?.data?.data?.attributes?.hp?.value ||
		!checkShouldShowDialog(target)
	) {
		return;
	}

	const name = actor?.data?.name;

  let dialogData = {
		initialformula: `{{hp}} - ${total}`,
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
					callback: async html => {
						const isHalved = html[0].querySelector('form').querySelector('[name="halved"]').checked;
						const modifier = html[0].querySelector('form').querySelector('[name="modifier"]').value;

						const { damage, hp: newHp } = processDamage({ actorInstance: actor, damage: total, isHalved, modifier }) || {};
						
						if (!damage && !newHp) {
							return;
						}

						actor.update({ 'data.attributes.hp.value': newHp });

						if (damage) {
							await ChatMessage.create(
								{
									content: game.i18n.format(
										"PID.DamageInflicted",
										{
											name,
											damage,
										}
									),
									rollMode: 'selfroll'
								},
							);
						}
						
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