# Elsewhere Quests Creator

## Adding a Quest Giver

1) `/resources/assets/vsquestexample/entities`
1) Create a .json file using the NPC's code name. This name must be all lowercase, no spaces, alphanumeric only. (ex. `mynewquestgiver.json`)
1) Copy contents of the `acorninnkeeper.json` and paste into your new file.
1) Update `code` to be the same as the file name.
1) Update the `client.shape.base` to be the shape of the character. (ex. `game:entity/land/wolf-female` or `game:entity/humanoid/trader`)
1) Update the `client.texture.base` to the texture needed. (ex. `game:entity/land/wolf-female` or `game:entity/humanoid/trader`)
1) If the entity asset you are using has alternatives you'd like to be available fill in the `client.texture.alternates` array. Otherwise remove it.
1) In `server.behaviors` under the behavior with `"code": "nametag"`, update the `selectFromRandomName` array.
1) In the `server.behaviors` under the behavior with the `"code": "questgiver"` add the `id` of all the quests this npc has access to.
1) If the npc should select only a few of the quests from the array update `selectrandom` to `true` and `selectrandomcount` to the number of quests in total this npc should have. What they select when generated into the game is the only quests they will ever have.
1) Open `/assets/vsquestexample/itemtypes/creatures.json`
1) Add the NPC's code name to `variantgroups.["code":"type"].states` array
1) Add them to the `shapeByType`. We use `"base": "game:entity/humanoid/trader"` for all. This item form of the NPC and is only used by admins.

  ```json
  "*-mynewquestgiver": {
    "base": "game:entity/humanoid/trader"
  }
  ```

14) Add them to the `texturesByType`. We use `"base": "game:entity/humanoid/trader"` for all. This item form of the NPC and is only used by admins.

  ```json
  "*-mynewquestgiver": {
    "skin": {
    "base": "game:entity/humanoid/trader"
  }
  ```

15) Add them to the `guiTransformByType`.

  ```json
  "*-mynewquestgiver": {
    "rotate": true,
    "rotation": {
      "x": 0,
      "y": -90,
      "z": -178
    },
    "origin": {
      "x": 0.6,
      "y": 0.78,
      "z": 0.5
    }
  }
  ```

16) Add them to the `tpHandTransformByType`.

  ```json
  "*-mynewquestgiver": {
    "translation": {
      "x": -0.6,
      "y": -1.1,
      "z": -0.4
    },
    "rotation": {
      "x": -85,
      "y": -11,
      "z": 89
    },
    "origin": {
      "x": 0.5,
      "y": 1,
      "z": 0.5
    },
    "scale": 0.7
  }
  ```

17) Add them to the `fpHandTransformByType`.

  ```json
  "*-mynewquestgiver": {
    "translation": {
      "x": 0.05,
      "y": -0.3,
      "z": 0
    },
    "rotation": {
      "x": 165,
      "y": 76,
      "z": -180
    }
  }
  ```

18) In `assets/vsquestexample/lang/en.json` in the `item-creature` section add a new display name value. (ex. `"item-creature-mynewquestgiver": "My New Quest Giver"`)

## Creating a Quest

1) In `assets/vsquestexample/config/quests.json` you will create a new object in the aray. These are grouped by quest giver, play order, then alphabetical for easier navigating. Our naming structure for the quest code names themselves is location or chain name (if a multilocation quest line) and then the quest name shorthand. For example all the quests for gathering materials the Acorn Inn needs to run smoothly are started with `acorninn`

  ```json
  {
    "id": "elsewherequests:quest-mynewquest",
    "cooldown": 24,
    "perPlayer": true,
    "predecessor": "vsquestexample:quest-acorninnwelcome",
    "gatherObjectives": [
      {
        "validCodes": [
          "gear-rusty", 
          "coin-silver"
        ],
        "demand": 5
      },
      {
        "validCodes": [
          "clay-red"
        ],
        "demand": 2
      }
    ],
    "killObjectives": [
      {
        "validCodes": [
          "drifter-normal",
          "drifter-deep",
          "drifter-tainted",
          "drifter-corrupt",
          "drifter-nightmare",
          "drifter-double-headed"
        ],
        "demand": 1
      }
    ],
    "itemRewards": [
      {
        "itemCode": "bricklayers:storagevesselcolored-red",
        "amount": 1
      },
      {
        "itemCode": "game:gear-temporal",
        "amount": 1
      }
    ]
  }
  ```

- `id`:  quest's code name prefaced with `elsewherequests:quest-` code names must be alphanumeric lowercase.
- `cooldown`: This is the length of in game hours before a player can do the quest again. 
  - hourly = 24
  - daily = 480 (to account for server down time)
  - weekly = 3360
  - monthly = 13440
  - one times = 999999999
- `perPlayer`: only change to false if it is a first come first serve quest (such as a large world event chain)
- `predecessor`: is the quest id of a quest that is required before this one.
- `gatherObjectives`: these are the items you have to gather to complete the quest (quests can have any comibination of objectives)
  - `validCodes`: an array of item/block codes that qualify for the objective. For example if you want a player to collect poison mushrooms but don't need a specific one, then you can add all the items codes for all the poison mushrooms to this array and any combination of those that add up to the demand total will count. This item/block code must be the same that you use with the `/giveitem` and `/giveblock` command in game but with out the prefix for `game:` or a the specific mod such as `lichen:`
  - `demand`: How many the NPC needs
- `killObjectives`: an array of entities you need killed.
  - `validCodes`: Same as with the gatherObjectives, you use the item/block code name of the entity without the mod prefix and can have multiple entities in the array.
  - `demand`: Total kills needed
- `itemRewards`: array of items rewarded when quest is completed
  - `itemCode`: Same as with the gatherObject, but only one and must include the mod prefix (ex. `"game:linensack"`)
  - `amount`: how many the player gets

2) In `assets/vsquestexample/entities` open the quest giver file(s) that will have this quest add the quest id to `quests` under `server.behaviors` in the behavior with the `"code": "questgiver"`.

  ```json
  {
    "code": "questgiver",
    "quests": [
      "vsquestexample:quest-myoldquest",
      "vsquestexample:quest-myotheroldquest",
      "vsquestexample:quest-mynewquest"
    ],
    "selectrandom": false,
    "selectrandomcount": 3
  }
  ```

3) In `assets/vsquestexample/lang/en.json` add the display text for the quest by adding the following

- `"elsewherequests-quest-[questcodename]-title": "Quest Title Goes Here"`
- `"elsewherequests-quest-[questcodename]-desc": "Quest body goes here"`
  - can use VTML in this space (ex, `<br>` for line breaks)
- `"elsewherequests-quest-[questcodename]-obj": "Get me stuff: {0}/5<br>Get me more stuff: {0}/10"`
  - can use VTML in this space (ex, `<br>` for line breaks)
  - make sure to include a line for each objective item
  - must include {0}/demand somewhere for each item so that the player has a count of what they have and how much is still needed.

  ```json
  {
    "item-creature-acorninnkeeper": "Acorn Inn Keeper",

    "elsewherequests:quest-acorninnwelcome-title": "Welcome to Elsewhere",
    "elsewherequests:quest-acorninnwelcome-desc": "Welcome! Did you just come through the rift? Feeling okay?... Good. <br> Well, why don't I help you get settled. Did you manage to bring anything through with you?<br><br><i>Type <b> /starterkit</b> with your inventory bar empty.</i>",
    "elsewherequests:quest-acorninnwelcome-obj": "Give inn keeper the blue vessel: {0}/1"
  }
  ```

  Try to keep quest chains / locations grouped together with a line blank between sections to help with the organization of this file. Also try to keep quests alphabetized within their section.

## Testing a New Quest Giver

1) Upload new version of mod into mods folder of the game and click `reload mods` to make sure the in game list has been synced.
2) Open a creative mode world (DO NOT TEST ON THE SERVER!!!!)
3) Find the new npc in the creative inventory. If you can't find them, you messed up the `creature.json` file step
4) Place the npc in the world. Make sure the textures and shape looks as expected. If not the issue is in their .json file in the entities folder.
5) Make sure their hover name is correct. If you get the code name instead of the display name check the `en.json` file
6) Make sure the quest dialog opens with shift clicking them with an empty hand.
7) Make sure the quests are all available (you may have to complete chain quests to unlock them all)

## Testing Quests

1) Make sure mod is updated (see above)
1) Open quest dialog with NPC in creative mode world (DO NOT TEST IN SERVER)
1) Verify the quest is in the quest list (if there are predecessor quests you may have to complete them first). If not you added it to the questgiver's json file wrong.
1) Verify the quest title is correct in the drop down and when selected. If not check the `-title` for this quest in the `en.json`.
1) Verify the quest description is correct. If not check the `-desc` for this quest in the `en.json`
1) Accept the quest and go to the active quest tab
1) Verify the objectives text is correct. If not check the `-obj` for this quest in the `en.json`
1) Meet the objective by spawning in the needed items or spawning in the needed mobs and killing them with the admin blade. Open the active quest and verify the number in the objectives is updating correctly. If not the item/block/entity code used for the objective is likely wrong in the `gatherObjectives` / `killObjectives` for this quest in the `quest.json`. Verify you have the write code by using `/giveitem`/`/giveblock` with the code command in the in game terminal to see if you get an error or if you get the item. You will need to add the mod prefix for these commands to work. If you can successfully give yourself the item/block and it is from a mod, check that the mod has been added to the `dependencies` in the `modinfo.json` file.
1) Complete the quest and verify you received the expected rewards. If you did not repeat the trouble shooting steps shown above for the wrong item code in the objectives. If you are seeing the item count show that you have all the objective items but the complete button is missing, check that the `demand` for the objective in the `quest.json` is correct and that the `-obj`'s text in the `en.json` file matches.
1) Check that any quests that have this quest as a prerequisit correctly unlocks the next set of quests. If not
