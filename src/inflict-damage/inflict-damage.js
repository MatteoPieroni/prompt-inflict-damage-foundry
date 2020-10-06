import { showInfo } from '../dialog/dialog';

export async function inflictDamage({ app = {}, data = {}, }) {
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