![Naga Bonar Logo](https://github.com/muhibbudins/NAGA-BONAR/blob/master/img/Logo.png "Naga Bonar Logo")

# Naga Bonar

The NAGA BONAR Project is an open source game project with license GPL-3.0, build with HTML, CSS JS (include jQuery library) and some image assets. Everyone can contribution to this project with fork and pull request from my github.

![Naga Bonar Board](https://github.com/muhibbudins/NAGA-BONAR/blob/master/img/preview.png "Naga Bonar Board")

[DEMO HERE](http://muhibbudins.github.io/NAGA-BONAR/naga-bonar.html)

## Docs

[Important!] Naga Bonar Class using jQuery for core library like animate, dom and anything

Rule Of Game (Its the rule of the game, everything algoritmas of this game defining from this rule)
1. Every pion move if start button or space key on clicked
2. Every pion move to blok with formula current location + getting random number (ex. current location is 1 and then this pion get dice 4 so this pion move to blok 5)
3. If pion walk above stairs so this pion will move up to end of stairs [Up]
4. If pion walk above dragon head so this pion will move down to end of tail dragon [Drop]
5. If pion get dice and > last blok so move pion to last blok and then move to blok "Last blok - rest of move" (ex. My pion on blok 96 and i get dice 6 so my pion move to blok 100 and move again to blok 98 ) [Retreat]
6. Player poin +10 if player moving, if player up so poin +20 and player drop so poin -5
7. Player move is summary for all getting dice

Formula Of Game (Define formula of game as math for moving and detection of pion and blok)

1. Use `Math.floor(Math.random() * 10 * 4)` to get random pixel position to set margin all of pion
2. Use attribute data-blok to find specific blok
3. Use `(Blok offset left - (board offset left - 20 pixel) )` to set position left of pion
4. Use `(Blok offset top - (570 pixel + (Math.floor(Math.random() * 2) + 1) * 10)` to set position top of pion
5. If pion moving before last blok use (location of pion + moving) step else (location of pion - moving)
6. If moving number as negative value convert it to positive with `Math.abs()` function
7. Set last pion with "If last pion + 1 > maximum pion define it with 1 else define it with last pion + 1"
8. Use `150 * moving` step to set interval of moving pion
9. If moving step > 5 convert moving step to 5

## Classes

Everything on this class using namespace `NagaBonar` for initialize.

## Defining Variable
Default Configuration

In this list i'm use variable to set all configuration with define :

- `allPion` to set pion to use of game, maximum 4 pion [Dont Change]
- `maxPion` to get how many pion in game
- `trigger` optional variable for trigger on some method
- `lastPion` to set last pion on last move
- `lastBlok` to get how many blok in game [Dont Change]
- `board` to define board element
- `lang` to define language for game (default id [Indonesia])
- `env` to set environtment for this game (dev or prod)
- `blok` is default array to make blok grid [Dont Change]
- `extraBlok` is customizible array to make extra blok in grid like dragon moving
- `pionObject` is default object for pion for save in localstorage

## Defining Method

#### Private
- `isUndefined()` Method to check a value is undefined or no
- `random()` Method to get random number from 1 until 6
- `storage()` Method to access HTML 5 Local Storage
- `parse()` Method to parse stringify to JSON (alias from JSON.parse())
- `string()` Method to convert JSON to stringify (alias from JSON.stringify())
- `echo()` Method to display console.log() with custom color (red, green & blue)
- `getStorage()` Method to get `naga_bonar` storage from browser

#### Public

- `initGrid()` Method to Initialize grid for game
- `initStart()` Method to create pion
- `initWord()` Method to create default text for player name etc.
- `initPion()` Method to set position pion to default position
- `initMove()` Method to Initialize moving pion
- `initAnimate()` Method to Animate pion from start to end formula
- `doStart()` Method to trigger moving pion
- `doRestart()` Method to re-setup all of game
- `placeColor()` Method to change background color when pion move
- `placeDice()` Method to change dice number
- `placeScore()` Method to set score, name etc.
- `saveAction()` Method to save all move and action to local storage
- `messageUp()` Method to trigger if pion wall above stairs
- `messageDrop()` Method to trigger if pion wall above dragon
- `closeGame()` Method to trigger if pion has finish game
- `popupMessageShow()` Method to show popup message
- `popupMessageClose()` Method to close popup message

## Character Name
- Ali
- Nilam
- William
- Richard

## Many Thanks for Awesome Software, Library & Website
- [jQuery Project [Awesome Core Library]](https://jquery.com/)
- [Animate CSS [Awesome CSS Animation Library]](https://daneden.github.io/animate.css/)
- [Font Awesome](http://fontawesome.io/)
- [Chinese Background Design Credits [Background on Grid Board]](www.vecteezy.com)
- [Inkscape [All Assets Images]](https://inkscape.org/en/)

## Contribution and Feedback
If you have any question for contribution, feedback and anything just contact me at my social media account.
- [Google Plus](https://plus.google.com/u/0/114560304957303980796)
- [Facebook](https://www.facebook.com/muhibbudinXboedass)
- [Github](https://github.com/muhibbudins/)
- [Linked In](https://www.linkedin.com/in/muhibbudins)

## License

This project under license GPL-3.0 [See License](https://github.com/muhibbudins/NAGA-BONAR/blob/master/LICENSE)