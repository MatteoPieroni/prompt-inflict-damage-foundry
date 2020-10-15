function checkHasOwnerOtherThanGm(targetId) {
	const users = game?.users;
	const actor = game?.actors?.get(targetId);

	// no-op
	if (!actor) {
		return false;
	}

	// if the current user is the GM, remove GM and default properties and check other permissions
	const nonGMPermissionUsers = Object.keys(actor.data.permission)
		.filter(perm => perm !== game.userId && perm !== 'default')
		.filter(perm => actor.data.permission[perm] === 3);

	if (nonGMPermissionUsers.length === 0) {
		return false;
	}

	// check any remaining owners are active
	const hasNonGMPermissionInGame = nonGMPermissionUsers
		.filter(permUser => users.get(permUser)?.active)
		.length > 0;


	// if the current user is the GM and
	// if there are other non-GM users with owner permission
	return hasNonGMPermissionInGame;
}

export function checkShouldShowDialog(target) {
	const targetId = target?.actor?.id;
	const users = game?.users;
	const currentUser = users?.get(game.userId);

	if (!targetId || !currentUser) {
		return true;
	}

	if (currentUser.isGM && checkHasOwnerOtherThanGm(targetId)) {
		return false;
	}

	return true;
}