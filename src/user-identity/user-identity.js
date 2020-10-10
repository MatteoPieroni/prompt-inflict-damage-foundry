function checkHasOwnerOtherThanGm(currentUser, targetId) {
	const actor = game?.actors?.get(targetId);

	// no-op
	if (!actor) {
		return false;
	}

	// if the current user is the GM, remove GM and default properties and check other permissions
	const hasNoneGMPermission = Object.keys(actor.data.permission)
		.filter(perm => perm !== game.userId && perm !== 'default')
		.filter(perm => actor.data.permission[perm] === 3)
		.length > 0;

	// check is active

	// if the current user is the GM and
	// if there are other non-GM users with owner permission
	return hasNoneGMPermission;
}

export function checkShouldShowDialog(target) {
	const targetId = target?.actor?.id;
	const users = game?.users;
	const currentUser = users?.get(game.userId);

	if (!targetId || !currentUser) {
		return true;
	}

	if (currentUser.isGM && checkHasOwnerOtherThanGm(currentUser, targetId)) {
		return false;
	}

	return true;
}