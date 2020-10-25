import { showInfo } from '../dialog/dialog';
import { log } from '../utils';

export async function inflictDamage({ app = {}, data = {}, }) {
	const type = app?.data?.flags?.dnd5e?.roll?.type || app?.data?.flags?.aime?.roll?.type;
	const targets = app.user && app.user.targets;

	const isDamage = type === 'damage';
	log('ciao', {type, targets})
	
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