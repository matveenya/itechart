
player = document.querySelector("#player");
lifes = 3;

document.addEventListener('keydown', function(event) {

	switch(event.keyCode){

		case 83:
			player.style.top = player.offsetTop + 80 + "px";
			break;

		case 87:
			player.style.top = player.offsetTop - 80 + "px";
			break;

		case 32:
			createBullet();
			break;

	}
});

function createBullet() {
	let bullet = document.createElement("div");
	bullet.className = "bullet";
	bullet.style.top = player.offsetTop + 150 + "px";
	document.body.appendChild(bullet);

	bulletMove(bullet)
}
createEnemy();

function bulletMove(bullet) {
	let timerId = setInterval(function() {
		bullet.style.left = bullet.offsetLeft + 10 + "px";
		isShot(bullet, timerId);
		
		if(bullet.offsetLeft > document.body.clientWidth) {
			bullet.remove();
			clearInterval(timerId);
		}

	}, 10);
}

function isShot(bullet, timer) {
	let topB = bullet.offsetTop;
	let bottomB = bullet.offsetTop + bullet.offsetHeight;

	let enemy = document.querySelector(".enemy");
	if(enemy != null) {
		let topE = enemy.offsetTop;
		let bottomE = enemy.offsetTop + enemy.offsetHeight;

		let leftB = bullet.offsetLeft;
		let leftE = enemy.offsetLeft;

		
		if(topB >= topE && topB <= bottomE && leftB >= leftE) {
			enemy.className = 'boom';
			enemy.style.top = (topE - 50) + "px";
			enemy.style.left = (leftE - 50) + "px";
			clearInterval(enemy.dataset.timer);
			setTimeout(function() {
				enemy.remove();
				createEnemy();
				bullet.remove();
				clearInterval(timer);
			}, 500)
		}
	}	

}

function isDie() {
	let enemy = document.querySelector('.enemy');

	if(enemy.offsetTop > player.offsetTop && 
		enemy.offsetTop < player.offsetTop + player.offsetHeight &&
		enemy.offsetLeft <= player.offsetLeft + player.offsetWidth) {
		enemy.className = 'boom';
		enemy.style.top = (player.offsetTop + 50) + "px";
		enemy.style.left = (player.offsetLeft + 50) + "px";
		clearInterval(enemy.dataset.timer);
		setTimeout(function() {
			enemy.remove();
			createEnemy();
		}, 500);
		die();
	}
}

function createEnemy() {
	let enemy = document.createElement("div");
	enemy.className = "enemy";
	enemy.style.top = random(200, document.body.offsetHeight - 100) + "px";
	
	document.body.appendChild(enemy);

	let timerId = setInterval(function() {

		enemy.style.left = (enemy.offsetLeft - 10) + "px";
		if(enemy.offsetLeft + enemy.offsetWidth < 0) {
			enemy.remove();
			clearInterval(timerId);
			createEnemy();
			die();
		}

		isDie();
	}, 100);
	enemy.dataset.timer = timerId;
}

function die() {
	lifes--;
	if(lifes != 0) {
		let lifesBlock = document.querySelector('#lifes');
		let life = lifesBlock.querySelector("span");
		life.remove();
	} else {
		endGame();
	}
	
}

function endGame() {
	document.body.innerHTML = "";
	alert("Game over");
	location.reload();
}

function random(min, max) {
  
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
