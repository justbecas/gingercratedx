// Hello GingerCrate User. If you're reading this, it probably means you know what you're doing. I, on the other hand, don't know what I'm doing. Well, I kinda know what I'm doing, just not a good way of doing it.
// No doubt you're gonna be furious because "Oh no, he should've used a switch statement here but instead he used a-" yeah no I get it, but it's about complexity. The reason GingerCrate DX exists is because
// the code in GingerCrate 1 was terrible. Specifically generating loot, which is why it was so laggy as soon as anyone actually played for five minutes. I don't need to be hyper efficient because this isn't
// autopilot software in an aircraft, it's a dumb website made with my own dumb hands. So sure, have fun mocking me and feeling superior, I don't mind, but just keep all of this in mind. Happy nerding!

// Hello! Me again. Enjoy looking at my code? I'm guessing not, but that's okay. If you have any REASONABLE suggestions (stuff like "There's a function for that!" or "These three lines can be done with this one
// line!") then I'd genuinely love to hear them. If you're going to tell me to rewrite everything, or that I shouldn't do xyz, or you just want to tell me that my code sucks, I won't listen and also do not care.
// This felt like an important PSA to put in here, but didn't want to sound really aggressive at the start of my code :P. Anyway, hope you had a good time. Have a good day!

inventoryListHTML = document.getElementById("inventoryList");
newListHTML = document.getElementById("newList");

availableCratesHTML = document.getElementById("availableCrates");
openCratesButtonHTML = document.getElementById("openCratesButton");

numberOfCoinsHTML = document.getElementById("numberOfCoins");
coinsPerClickHTML = document.getElementById("coinsPerClick");
coinsPerSecondHTML = document.getElementById("coinsPerSecond");
autoClickerHTML = document.getElementById("autoClicker");

crateBuyButtonHTML = document.getElementById("crateBuyButton");
autoBuyHTML = document.getElementById("autoBuy");

sellDropdownHTML = document.getElementById("sellDropdown");
sellCounterHTML = document.getElementById("sellCounter");
sellPriceHTML = document.getElementById("sellPrice");
sellPriceHTML = document.getElementById("sellPrice");

mythicCounterHTML = document.getElementById("mythicCounter");
legendaryCounterHTML = document.getElementById("legendaryCounter");
epicCounterHTML = document.getElementById("epicCounter");
rareCounterHTML = document.getElementById("rareCounter");
uncommonCounterHTML = document.getElementById("uncommonCounter");
commonCounterHTML = document.getElementById("commonCounter");
tradeInCounters = [
	mythicCounterHTML,
	legendaryCounterHTML,
	epicCounterHTML,
	rareCounterHTML,
	uncommonCounterHTML,
	commonCounterHTML,
];

mythicEffectHTML = document.getElementById("mythicEffect");
legendaryEffectHTML = document.getElementById("legendaryEffect");
epicEffectHTML = document.getElementById("epicEffect");
rareEffectHTML = document.getElementById("rareEffect");
uncommonEffectHTML = document.getElementById("uncommonEffect");
commonEffectHTML = document.getElementById("commonEffect");
tradeInEffects = [
	mythicEffectHTML,
	legendaryEffectHTML,
	epicEffectHTML,
	rareEffectHTML,
	uncommonEffectHTML,
	commonEffectHTML,
];

ch1ButtonHTML = document.getElementById("ch1Button");
ch2ButtonHTML = document.getElementById("ch2Button");
ch3ButtonHTML = document.getElementById("ch3Button");
ch4ButtonHTML = document.getElementById("ch4Button");
ch5ButtonHTML = document.getElementById("ch5Button");
ch6ButtonHTML = document.getElementById("ch6Button");
ch7ButtonHTML = document.getElementById("ch7Button");
ch8ButtonHTML = document.getElementById("ch8Button");
ch9ButtonHTML = document.getElementById("ch9Button");
ch10ButtonHTML = document.getElementById("ch10Button");
ch11ButtonHTML = document.getElementById("ch11Button");
ch12ButtonHTML = document.getElementById("ch12Button");
chapterButtons = [
	ch1ButtonHTML,
	ch2ButtonHTML,
	ch3ButtonHTML,
	ch4ButtonHTML,
	ch5ButtonHTML,
	ch6ButtonHTML,
	ch7ButtonHTML,
	ch8ButtonHTML,
	ch9ButtonHTML,
	ch10ButtonHTML,
	ch11ButtonHTML,
	ch12ButtonHTML,
];

postGameButtonHTML = document.getElementById("postGameButton");
postGameTextHTML = document.getElementById("postGameText");

consentButtonHTML = document.getElementById("consentButton");
cookieTextHTML = document.getElementById("cookieText");

titleHTML = document.getElementById("title");
subtitleHTML = document.getElementById("subtitle");

indexPair = [0, 0];
timerRunning = false;
coinsPerSecond = 0;
mythicTradesUntilMax = 10;

audioPlaying = false;
waitingToReveal = false;

sellPrices = [5000, 500, 100, 10, 1, 0.1];
rarities = ["Mythic", "Legendary", "Epic", "Rare", "Uncommon", "Common"];

debugIncrement = 5000;

endings = [
	["The End", 0, 236000],
	["The Second End", 1000000, 185000], // One Million
	["The Third End", 5000000, 81000], // Five Million
	["The Fourth End", 10000000, 217000], // Ten Million
	["The Fifth End", 30000000, 222000], // Thirty Million
	["The Sixth End", 50000000, 233000], // Fifty Million
	["The Seventh End", 100000000, 296000], // One Hundred Million
	["The Eighth End", 1000000000, 178000], // One Billion
	["The Ninth End", 9000000000, 0], // Nine Billion
];

function Debug() {
	SetCoins(coins + 10000000);
	UpdateInventory();
}

function OnLoad() {
	LoadVariables();

	LoadRewards();
	UpdateInventory();
	LoadShop();

	SetCrates(numberofCrates);
	UpdateCrates();
	SetCratePrice(cratePrice);

	SetCoins(coins);
	UpdateCoins();
	SetCoinsPerClick(coinsPerClick);
	SetCoinsPerSecond(coinsPerSecond);

	CheckCoinsPerSecond();
}

function LoadVariables() {
	// I have no idea if this is how cookies work or if this is how you're supposed to use them.
	if (GetCookie("numberofCrates") == "") {
		numberofCrates = 10;
	} else {
		numberofCrates = parseInt(GetCookie("numberofCrates"), 10);
	}
	if (GetCookie("cratePrice") == "") {
		cratePrice = 30;
	} else {
		cratePrice = parseInt(GetCookie("cratePrice"), 10);
	}
	if (GetCookie("coins") == "") {
		coins = 10;
	} else {
		coins = parseInt(GetCookie("coins"), 10);
	}
	if (GetCookie("coinsPerClick") == "") {
		coinsPerClick = 1;
	} else {
		coinsPerClick = parseInt(GetCookie("coinsPerClick"), 10);
	}
	if (GetCookie("autoInterval") == "") {
		autoInterval = 1000;
	} else {
		autoInterval = parseInt(GetCookie("autoInterval"), 10);
	}
	if (GetCookie("autoBuy") == "") {
		autoBuy = true;
	} else {
		autoBuy = StringToBool(GetCookie("autoBuy"));
		if (autoBuy == false) {
			autoBuyHTML.checked = false;
		}
	}
	if (GetCookie("extraCrateChance") == "") {
		extraCrateChance = 0;
	} else {
		extraCrateChance = parseInt(GetCookie("extraCrateChance"), 10);
	}
	if (GetCookie("extraCoinChance") == "") {
		extraCoinChance = 0;
	} else {
		extraCoinChance = parseInt(GetCookie("extraCoinChance"), 10);
	}
	if (GetCookie("consent") == "") {
		consent = false;
	} else {
		consent = StringToBool(GetCookie("consent"));
		consentButtonHTML.style.display = "none";
	}
	if (GetCookie("postGameStage") == "") {
		postGameStage = -1;
	} else {
		postGameStage = parseInt(GetCookie("postGameStage"), 10);
	}
	if (GetCookie("qazwsxCount") == "") {
		qazwsxCount = 0;
	} else {
		qazwsxCount = parseInt(GetCookie("qazwsxCount"), 10);
	}
	if (GetCookieString("items") == "") {
		items = [
			[
				["Killbot 9000000 Action Figure", 0, 0],
				["Steve Plush", 0, 0],
				["Barry The Green Cube Memo Block", 0, 0],
			], // Mythic
			[
				["Stretch Gingerfork", 0, 0],
				["FlamingYeti Statuette", 0, 0],
				["Aetherial Sticker Set", 0, 0],
				["Framed Picture of Maddnix", 0, 0],
				["Fran Bobblehead", 0, 0],
			], // Legendary
			[
				["Ludis Crolo Onesie", 0, 0],
				["G Licious's Mask", 0, 0],
				["Cy'Ril Playset", 0, 0],
				["Killbot Comics", 0, 0],
				["The Slaw T-Shirt", 0, 0],
				["Ceramic Cyril", 0, 0],
			], // Epic
			[
				["Strok: The Board Game", 0, 0],
				["Space Expert's Guide To Space", 0, 0],
				["Framed Picture of Luke's Mum", 0, 0],
				["'Trouble In Chat-Topia' Mod Team Lego® Set", 0, 0],
				["Robot 9 Collector Card (Shiny)", 0, 0],
				["Prangle Prince Branded Prangles", 0, 0],
				["Abstract Rock Paperweight", 0, 0],
			], // Rare
			[
				["Tub of Data Slime", 0, 0],
				["Græyman Face Mask", 0, 0],
				["Cargo Plane Dragon Bath Bombs", 0, 0],
				["'The Juice' Waterbottle", 0, 0],
				["The Homeo Colour-Changing Mug", 0, 0],
				["Crangslang USB Drive (4GB)", 0, 0],
				["Twitch Chat Jen Soundboard", 0, 0],
				["The Bone Doctors Dice Set", 0, 0],
				["Peace Forest Reusable Drinking Straw", 0, 0],
			], // Uncommon
			[
				["Killbot X Memorial Pin Badge", 0, 0],
				["Jeff The Dinosaur Finger Puppet", 0, 0],
				["Kathleen The Dinosaur Finger Puppet", 0, 0],
				["Jimbo Fridge Magnet", 0, 0],
				["Harry Wong Poster", 0, 0],
				["'Voidwalker' Poster", 0, 0],
				["Killdog Mount (Redeemable in World of Forkcraft™)", 0, 0],
				["Robot 9 Collector Card", 0, 0],
			], // Common
		];
	} else {
		items = GetCookieString("items");
	}
	if (GetCookieString("rewardProgress") == "") {
		rewardProgress = [
			true,
			true,
			true,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
		];
	} else {
		rewardProgress = GetCookieString("rewardProgress");
		for (var i = 0; i < rewardProgress.length; i++) {
			rewardProgress[i] = StringToBool(rewardProgress[i]);
		}
	}
}

function OpenCrates() {
	if (consent == true) {
		if (numberofCrates > 0) {
			if (numberofCrates < 1000000000) {
				crateTickNumber = numberofCrates;
				SetCrates(0);
			} else {
				crateTickNumber = 1000000000;
				SetCrates(numberofCrates - 1000000000);
			}
			specialFound = 0;
			for (crateTickNumber; crateTickNumber > 0; crateTickNumber--) {
				numberOfItems = RandInt(4, 7);
				for (var i = 0; i < numberOfItems; i++) {
					rarityValue = RandInt(1, 100001);
					if (rarityValue == 1) {
						// Mythic
						rarity = 0;
						specialChance = RandInt(1, 100001);
						if (specialChance == 1) {
							qazwsxCount++;
							SetCookie("qazwsxCount", qazwsxCount, 720);
							specialFound++;
						}
					} else if (rarityValue >= 2 && rarityValue <= 50) {
						// Legendary
						rarity = 1;
					} else if (rarityValue >= 51 && rarityValue <= 300) {
						// Epic
						rarity = 2;
					} else if (rarityValue >= 301 && rarityValue <= 5000) {
						// Rare
						rarity = 3;
					} else if (rarityValue >= 5001 && rarityValue <= 30000) {
						// Uncommon
						rarity = 4;
					} else if (rarityValue >= 30001 && rarityValue <= 100000) {
						// Common
						rarity = 5;
					}
					randomItem = RandInt(0, items[rarity].length);
					items[rarity][randomItem][1]++;
					items[rarity][randomItem][2]++;
				}
			}
			newString = "";
			if (specialFound > 0) {
				newString +=
					'<li style="color:brown;">Luke Pencil Holder x ' +
					NumberToString(specialFound) +
					"</li>";
				specialFound = 0;
			}
			for (var i = 0; i < items.length; i++) {
				for (var j = 0; j < items[i].length; j++) {
					if (items[i][j][2] > 0) {
						newString +=
							'<li class="' +
							rarities[i].toString().toLowerCase() +
							'">' +
							items[i][j][0] +
							" x " +
							NumberToString(items[i][j][2]) +
							"</li>";
					}
				}
			}
			newListHTML.innerHTML = newString;
			SetCookie("numberofCrates", numberofCrates, 720);
			UpdateInventory();
			UpdateCrates();

			// Wipe the new items cache
			for (var i = 0; i < items.length; i++) {
				for (var j = 0; j < items[i].length; j++) {
					items[i][j][2] = 0;
				}
			}
		}
	} else {
		NoConsent();
	}
}

function Click(auto) {
	if (consent == true) {
		SetCoins(coins + coinsPerClick);
		if (RandInt(1, 1001) <= extraCoinChance * 10) {
			SetCoins(coins + 1);
			coinsPerSecond++;
		}
		coinsPerSecond += coinsPerClick;
		UpdateCoins();
		if (auto == true) {
			autoTimer = setTimeout(Click, autoInterval, true);
		}
	} else {
		NoConsent();
	}
}

function BuyCrate() {
	if (consent == true) {
		if (coins >= cratePrice) {
			coins -= cratePrice;
			SetCrates(numberofCrates + 1);
			if (RandInt(1, 1001) <= extraCrateChance * 10) {
				SetCrates(numberofCrates + 1);
			}
		}
		UpdateCrates();
		UpdateCoins();
	} else {
		NoConsent();
	}
}

function BuyAll() {
	if (consent == true) {
		// BuyAll purposfully ignores all the lovely functions I've made and stuff because they're just too damn slow
		while (coins - cratePrice >= 0) {
			coins -= cratePrice;
			numberofCrates++;
			if (RandInt(1, 1001) <= extraCrateChance * 10) {
				numberofCrates++;
			}
		}
		SetCookie("numberofCrates", numberofCrates, 720);
		SetCookie("coins", coins, 72);
		UpdateCoins();
		UpdateCrates();
	} else {
		NoConsent();
	}
}

function Sell() {
	if (consent == true) {
		if (
			Number.isInteger(
				sellPrices[indexPair[0]] * parseInt(sellCounterHTML.value, 10)
			) == true
		) {
			SetCoins(
				(coins +=
					sellPrices[indexPair[0]] *
					parseInt(sellCounterHTML.value, 10))
			);
			items[indexPair[0]][indexPair[1]][1] -= parseInt(
				sellCounterHTML.value,
				10
			);
			UpdateCoins();

			sellDropdownOptions = sellDropdownHTML.options; // Move on
			if (
				sellDropdownOptions.selectedIndex + 1 <
				sellDropdownOptions.length
			) {
				if (indexPair[1] < items[indexPair[0]].length - 1) {
					sellDropdownOptions.selectedIndex += 1;
				} else {
					sellDropdownOptions.selectedIndex += 2;
				}
			}

			UpdateInventory();
			UpdateShop();
		}
	} else {
		NoConsent();
	}
}

function Trade() {
	if (consent == true) {
		if (legendaryCounterHTML.value > 0) {
			// Legendary
			if (CanTrade(1, legendaryCounterHTML.value, 49)) {
				if (
					coinsPerClick + parseInt(legendaryCounterHTML.value, 10) <=
					50
				) {
					SetCoinsPerClick(
						coinsPerClick + parseInt(legendaryCounterHTML.value, 10)
					);
					legendaryCounterHTML.value = 0;
				}
				if (coinsPerClick >= 50) {
					legendaryEffectHTML.style.display = "none";
					legendaryCounterHTML.style.display = "none";
				}
			}
		}
		if (mythicCounterHTML.value > 0) {
			// Mythic
			if (CanTrade(0, mythicCounterHTML.value, mythicTradesUntilMax)) {
				SetCoinsPerClick(
					coinsPerClick * Math.pow(2, mythicCounterHTML.value)
				);
				if (
					coinsPerClick * Math.pow(2, mythicCounterHTML.value) <=
					800
				) {
					mythicCounterHTML.value = 0;
				}
				if (coinsPerClick >= 800) {
					SetCoinsPerClick(800);
					mythicEffectHTML.style.display = "none";
					mythicCounterHTML.style.display = "none";
					legendaryEffectHTML.style.display = "none";
					legendaryCounterHTML.style.display = "none";
				}
			}
		}
		if (epicCounterHTML.value > 0) {
			// Epic
			if (CanTrade(2, epicCounterHTML.value, 25)) {
				if (cratePrice - parseInt(epicCounterHTML.value, 10) > 5) {
					SetCratePrice(cratePrice - epicCounterHTML.value);
					UpdateSellPrice();
				} else {
					SetCratePrice(5);
					epicEffectHTML.style.display = "none";
					epicCounterHTML.style.display = "none";
				}
				epicCounterHTML.value = 0;
			}
		}
		if (rareCounterHTML.value > 0) {
			// Rare
			if (CanTrade(3, rareCounterHTML.value, 999)) {
				if (autoInterval - parseInt(rareCounterHTML.value, 10) > 1) {
					autoInterval -= rareCounterHTML.value;
				} else {
					autoInterval = 1;
					rareEffectHTML.style.display = "none";
					rareCounterHTML.style.display = "none";
				}
				rareCounterHTML.value = 0;
				SetCookie("autoInterval", autoInterval, 720);
			}
		}
		if (uncommonCounterHTML.value > 0) {
			// Uncommon
			if (CanTrade(4, uncommonCounterHTML.value, 750)) {
				if (
					extraCrateChance +
						0.1 * parseInt(uncommonCounterHTML.value, 10) <
					75
				) {
					extraCrateChance += 0.1 * uncommonCounterHTML.value;
				} else {
					extraCrateChance = 75;
					uncommonEffectHTML.style.display = "none";
					uncommonCounterHTML.style.display = "none";
				}
				uncommonCounterHTML.value = 0;
				SetCookie("extraCrateChance", extraCrateChance, 720);
			}
		}
		if (commonCounterHTML.value > 0) {
			// Common
			if (CanTrade(5, commonCounterHTML.value, 750)) {
				if (
					extraCoinChance +
						0.1 * parseInt(commonCounterHTML.value, 10) <
					75
				) {
					extraCoinChance += 0.1 * commonCounterHTML.value;
				} else {
					extraCoinChance = 75;
					commonEffectHTML.style.display = "none";
					commonCounterHTML.style.display = "none";
				}
				commonCounterHTML.value = 0;
				SetCookie("extraCoinChance", extraCoinChance, 720);
			}
		}
		UpdateInventory();
	} else {
		NoConsent();
	}
}

function CanTrade(rarityIndex, quantity, limit) {
	if (quantity > limit) {
		quantity = limit;
	}
	lowestIndex = 0;
	for (var i = 0; i < items[rarityIndex].length; i++) {
		if (items[rarityIndex][i][1] <= items[rarityIndex][lowestIndex][1]) {
			lowestIndex = i;
		}
	}
	if (items[rarityIndex][lowestIndex][1] >= quantity) {
		for (var i = 0; i < items[rarityIndex].length; i++) {
			items[rarityIndex][i][1] -= quantity;
		}
		return true;
	} else {
		return false;
	}
}

function PlayReward(num) {
	if (consent == true) {
		// Make sure the user is allowed to listen
		canPlay = false;
		if (rewardProgress[num] == true || num >= 12) {
			canPlay = true;
		}

		if (audioPlaying == true) {
			audio.pause();
			audioPlaying = false;
		}
		if (audioPlaying == false && canPlay == true) {
			if (num <= 11) {
				audio = new Audio("ch" + num + ".wav");
			} else {
				SetCoinsPerClick(coinsPerClick + 200);
				audio = new Audio("end" + (num - 12) + ".wav");
				postGameButtonHTML.disabled = true;
				if (waitingToReveal == false && postGameStage < 8) {
					setTimeout(RevealReward, endings[postGameStage][2]);
					waitingToReveal = true;
				}
			}
			audio.play();
			audioPlaying = true;
		}
	} else {
		NoConsent();
	}
}

function StopPlayback() {
	if (audioPlaying == true) {
		audio.pause();
		audioPlaying = false;
	}
}

function RevealReward() {
	waitingToReveal = false;
	postGameStage++;
	SetCookie("postGameStage", postGameStage, 720);

	postGameButtonHTML.style.display = "initial";
	postGameButtonHTML.innerHTML = endings[postGameStage][0];

	if (postGameStage > 0) {
		postGameTextHTML.style.display = "initial";
		postGameTextHTML.innerHTML =
			"x" +
			NumberToString(endings[postGameStage][1]) +
			" Everything";
	}
}

function CheckCoinsPerSecond() {
	UpdateCoinsPerSecond(coinsPerSecond);
	coinsPerSecond = 0;
	setTimeout(CheckCoinsPerSecond, 1000);
}

function UpdateInventory() {
	listHTML = "";
	if (qazwsxCount > 0) {
		listHTML +=
			'<li style="border-left: 5px solid brown; ">'
			+ NumberToString(qazwsxCount)
			+ 'Luke Pencil Holder: </li>';
	}
	for (var i = 0; i < items.length; i++) {
		listHTML += `<li class="item-name">${rarities[i]}</li>`;
	
		for (var j = 0; j < items[i].length; j++) {
			if (i == 0) {
				colourBorder="mythic";
			} else if (i == 1) {
				colourBorder="legendary";
			} else if (i == 2) {
				colourBorder="epic";
			} else if (i == 3) {
				colourBorder="rare";
			} else if (i == 4) {
				colourBorder="uncommon";
			} else {
				colourBorder="common";
			}
			listHTML +=
				'<li class="' +
				colourBorder +
				'">' + "<b>" +
				NumberToString(items[i][j][1]) +
				"</b>: " +
				items[i][j][0] +
				"</li>";
		}
	}
	inventoryListHTML.innerHTML = listHTML;
	SetCookieString("items", items, 720);
	// In fact, while we're here, update trade-in maxs too.
	for (var i = 0; i < tradeInCounters.length; i++) {
		lowestItemQuantityIndex = 0;
		for (var j = 0; j < items[i].length; j++) {
			if (items[i][j][1] <= items[i][lowestItemQuantityIndex][1]) {
				lowestItemQuantityIndex = j;
			}
		}
		mythicTradesUntilMax = 0;
		for (
			var imaginaryIncreasedClicks = coinsPerClick;
			imaginaryIncreasedClicks < 800;
			imaginaryIncreasedClicks *= 2
		) {
			mythicTradesUntilMax++;
		}
		if (i == 0) {
			mythicCounterHTML.max = Math.min(
				items[i][lowestItemQuantityIndex][1],
				mythicTradesUntilMax
			);
		} else if (i == 1) {
			legendaryCounterHTML.max = Math.min(
				items[i][lowestItemQuantityIndex][1],
				50 - coinsPerClick
			);
		} else if (i == 2) {
			// Manually adjust some tradeInCounter maxs
			epicCounterHTML.max = Math.min(
				items[i][lowestItemQuantityIndex][1],
				cratePrice - 5
			);
		} else if (i == 3) {
			rareCounterHTML.max = Math.min(
				items[i][lowestItemQuantityIndex][1],
				autoInterval - 1
			);
		} else if (i == 4) {
			uncommonCounterHTML.max = Math.min(
				items[i][lowestItemQuantityIndex][1],
				750 - extraCrateChance
			);
		} else if (i == 5) {
			commonCounterHTML.max = Math.min(
				items[i][lowestItemQuantityIndex][1],
				750 - extraCoinChance
			);
		} else {
			tradeInCounters[i].max = items[i][lowestItemQuantityIndex][1];
		}
	}

	uncommonCounterHTML.step = 10;
	for (var i = 0; i < items[4].length; i++) {
		if (items[4][i][1] < 100) {
			uncommonCounterHTML.step = 1;
		}
	}

	rareCounterHTML.step = 10;
	for (var i = 0; i < items[3].length; i++) {
		if (items[3][i][1] < 100) {
			rareCounterHTML.step = 1;
		}
	}
	// Oh, tell you what, let's sort out those rewards too
	failure = false;
	if (failure == false) {
		for (var i = 0; i < items[3].length; i++) {
			// All Rares
			if (items[3][i][1] < 1) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[3] = true;
			chapterButtons[3].disabled = false;
		}
	}
	if (failure == false) {
		// All Epics
		for (var i = 0; i < items[2].length; i++) {
			if (items[2][i][1] < 1) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[4] = true;
			chapterButtons[4].disabled = false;
		}
	}
	if (failure == false) {
		// All Legendaries
		for (var i = 0; i < items[1].length; i++) {
			if (items[1][i][1] < 1) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[5] = true;
			chapterButtons[5].disabled = false;
		}
	}
	if (failure == false) {
		// x1 Everything
		for (var i = 0; i < items[0].length; i++) {
			if (items[0][i][1] < 1) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[6] = true;
			chapterButtons[6].disabled = false;
		}
	}
	if (failure == false) {
		// x5 Everything
		for (var i = 0; i < items[0].length; i++) {
			if (items[0][i][1] < 5) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[7] = true;
			chapterButtons[7].disabled = false;
		}
	}
	if (failure == false) {
		// x10 Everything
		for (var i = 0; i < items[0].length; i++) {
			if (items[0][i][1] < 10) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[8] = true;
			chapterButtons[8].disabled = false;
		}
	}
	if (failure == false) {
		// x100 Everything
		for (var i = 0; i < items[0].length; i++) {
			if (items[0][i][1] < 100) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[9] = true;
			chapterButtons[9].disabled = false;
		}
	}
	if (failure == false) {
		// x1,000 Everything
		for (var i = 0; i < items[0].length; i++) {
			if (items[0][i][1] < 1000) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[10] = true;
			chapterButtons[10].disabled = false;
		}
	}
	if (failure == false) {
		// x10,000 Everything
		for (var i = 0; i < items[0].length; i++) {
			if (items[0][i][1] < 10000) {
				failure = true;
				break;
			}
		}
		if (failure == false) {
			rewardProgress[11] = true;
			chapterButtons[11].disabled = false;
			if (postGameStage == -1 && waitingToReveal == false) {
				setTimeout(RevealReward, 3000);
				waitingToReveal = true;
			}
		}
	}
	SetCookieString("rewardProgress", rewardProgress, 720);

	// Post-Game
	if (postGameStage >= 0) {
		readyToUnlock = true;
		for (var i = 0; i < items.length; i++) {
			for (var j = 0; j < items[i].length; j++) {
				if (items[i][j][1] < endings[postGameStage][1]) {
					readyToUnlock = false;
					break;
				}
			}
		}
		if (readyToUnlock == true) {
			postGameButtonHTML.disabled = false;
		}
	}
}

function LoadShop() {
	// Dropdown
	dropdownString = "";
	for (var i = 0; i < items.length; i++) {
		dropdownString +=
			'<option value="' +
			rarities[i] +
			'" disabled="true">' +
			rarities[i] +
			" - " +
			NumberToString(sellPrices[i]) +
			" Coins</option>";
		for (var j = 0; j < items[i].length; j++) {
			dropdownString +=
				'<option value="' +
				[i, j] +
				'">' +
				items[i][j][0] +
				"</option>";
		}
	}
	sellDropdownHTML.innerHTML = dropdownString;
	UpdateShop();
	// Don't show all this trade-in trash if we've done it all before
	if (coinsPerClick >= 50) {
		// Legendary
		legendaryEffectHTML.style.display = "none";
		legendaryCounterHTML.style.display = "none";
	}
	if (coinsPerClick >= 800) {
		mythicEffectHTML.style.display = "none";
		mythicCounterHTML.style.display = "none";
	}
	if (cratePrice == 5) {
		// Epic
		epicEffectHTML.style.display = "none";
		epicCounterHTML.style.display = "none";
	}
	if (autoInterval == 1) {
		// Rare
		rareEffectHTML.style.display = "none";
		rareCounterHTML.style.display = "none";
	}
	if (extraCrateChance == 75) {
		// Uncommon
		uncommonEffectHTML.style.display = "none";
		uncommonCounterHTML.style.display = "none";
	}
	if (extraCoinChance == 75) {
		// Common
		commonEffectHTML.style.display = "none";
		commonCounterHTML.style.display = "none";
	}
}

function UpdateShop() {
	indexPair = sellDropdownHTML.value;
	indexPair = [sellDropdownHTML.value[0], sellDropdownHTML.value[2]];

	if (indexPair[0] == 5) {
		trueValue = items[indexPair[0]][indexPair[1]][1].toString();
		uncommonSellMax = parseInt(
			trueValue.substring(0, trueValue.length - 1) + "0",
			10
		);
		sellCounterHTML.max = uncommonSellMax;
		sellCounterHTML.value = uncommonSellMax;
		sellCounterHTML.step = 10;
	} else {
		sellCounterHTML.max = items[indexPair[0]][indexPair[1]][1];
		sellCounterHTML.value = sellCounterHTML.max;
		sellCounterHTML.step = 1;
	}

	UpdateSellPrice();
}

function UpdateSellPrice() {
	sellPriceHTML.innerHTML =
		NumberToString(sellPrices[indexPair[0]] * sellCounter.value) + " Coins";
}

function LoadRewards() {
	for (var i = 0; i < rewardProgress.length; i++) {
		if (rewardProgress[i] == true) {
			chapterButtons[i].disabled = false;
		}
	}
	if (postGameStage > -1) {
		postGameStage--;
		RevealReward();

		postGameButtonHTML.disabled = true;
	}
}

function ToggleAutoClick() {
	if (autoClickerHTML.checked == true) {
		Click(true);
	} else {
		clearTimeout(autoTimer);
	}
}

function ToggleAutoBuy() {
	if (autoBuyHTML.checked == true) {
		autoBuy = true;
		BuyCrate();
	} else {
		autoBuy = false;
	}
	SetCookie("autoBuy", autoBuy, 720);
}

function NumberToString(num) {
	newString = "";
	stringNum = num.toString();
	if (num < 9999999999999999) {
		counter = 0;
		for (var i = stringNum.length - 1; i >= 0; i--) {
			if (counter % 3 == 0 && counter > 0) {
				newString = "," + newString;
			}
			newString = stringNum[i] + newString;
			counter++;
		}
	} else {
		newString = num.toString();
	}
	return newString;
}

function StringToBool(string) {
	if (string == "true" || string == true) {
		return true;
	} else {
		return false;
	}
}

function SetCrates(newNumberOfCrates) {
	numberofCrates = newNumberOfCrates;
	SetCookie("numberofCrates", numberofCrates, 720);
	if (numberofCrates >= 1000000000) {
		openCratesButtonHTML.innerHTML = "Open 1 Billion Crates";
	} else {
		openCratesButtonHTML.innerHTML = "Open Crates";
	}
}

function SetCratePrice(newCratePrice) {
	cratePrice = newCratePrice;
	SetCookie("cratePrice", cratePrice, 720);
	UpdateCratePrice();
}

function SetCoins(newNumberOfCoins) {
	coins = newNumberOfCoins;
	SetCookie("coins", coins, 720);
	if (autoBuy == true) {
		BuyAll();
	}
}

function SetCoinsPerClick(newCoinsPerClick) {
	coinsPerClick = newCoinsPerClick;
	SetCookie("coinsPerClick", coinsPerClick, 720);
	UpdateCoinsPerClick();
}

function SetCoinsPerSecond(newCoinsPerSecond) {
	coinsPerSecond = newCoinsPerSecond;
	UpdateCoinsPerSecond();
}

function UpdateCrates() {
	availableCratesHTML.innerHTML =
		"Available Crates: <b>" + NumberToString(numberofCrates) + "</b>";
	if (numberofCrates >= 1000000000) {
		openCratesButtonHTML.innerHTML = "Open 1 Billion Crates";
	} else {
		openCratesButtonHTML.innerHTML = "Open Crates";
	}
}

function UpdateCratePrice() {
	crateBuyButtonHTML.innerHTML =
		"<b>Buy Crate [" + NumberToString(cratePrice) + " Coins]</b>";
}

function UpdateCoins() {
	numberOfCoinsHTML.innerHTML = "Coins: <b>" + NumberToString(coins) + "</b>";
}

function UpdateCoinsPerClick() {
	coinsPerClickHTML.innerHTML =
		"Coins/click: <b>" + NumberToString(coinsPerClick) + "</b>";
}

function UpdateCoinsPerSecond() {
	coinsPerSecondHTML.innerHTML =
		"Coins/second: <b>" + NumberToString(coinsPerSecond) + "</b>";
}

function Consent() {
	consent = true;
	SetCookie("consent", true, 720);
	consentButtonHTML.style.display = "none";
	subtitleHTML.innerHTML =
		"Welcome to the Crateiverse. In here, your body and mind are worthless. Your goals and ambitions are worthless. You have one purpose. Open crates. Get items. Save the future.";
}

function NoConsent() {
	subtitleHTML.innerHTML =
		"GingerCrate DX uses cookies to store your inventory, trade-in info, coins, rewards, and a couple of other boring bits of data. You seen to consent to cookies to proceed:";
}

function RandInt(lower, upper) {
	// Can be lower bound, can't be upper bound
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

function SetCookie(cname, cvalue, exdays) {
	if (consent == true) {
		var d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
}

function GetCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function SetCookieString(cname, cvalue, exdays) {
	var jsonString = JSON.stringify(cvalue);
	SetCookie(cname, jsonString, exdays);
}

function GetCookieString(cname) {
	var jsonString = GetCookie(cname);
	try {
		returnValue = JSON.parse(jsonString);
	} catch (SyntaxError) {
		returnValue = "";
	}
	return returnValue;
}

document.addEventListener("load", OnLoad());