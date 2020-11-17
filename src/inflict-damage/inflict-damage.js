import { showInfo } from '../dialog/dialog';
import { log } from '../utils';

export async function inflictDamage({ app = {}, data = {}, }) {
	let flagDomain = game.system.id;

	try {
		flagDomain = game.settings.get('prompt-inflict-damage', 'flagDomain');
	} catch(e) {
		log("Game setting not found, falling back on the system id");
	}

	const type = app?.data?.flags?.[flagDomain]?.roll?.type || app?.data?.flags?.dnd5e?.roll?.type;
	const targets = app.user && app.user.targets;

	const isDamage = type === 'damage';
	log({type, targets})
	
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