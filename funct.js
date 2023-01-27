/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

var hostagefaction = 0
var leaderstrength = 0

var leadervalues = new Array()
leadervalues[1] = new Array(0, 5, 5, 4, 2, 1)
leadervalues[2] = new Array(0, 5, 5, 5, 5, 5)
leadervalues[3] = new Array(0, 6, 5, 3, 3, 2)
leadervalues[4] = new Array(0, 7, 6, 5, 3, 2)
leadervalues[5] = new Array(0, 6, 4, 4, 2, 1)
leadervalues[6] = new Array(0, 5, 5, 4, 2, 1)
leadervalues[7] = new Array(0, 5, 3, 3, 2, 1)
leadervalues[8] = new Array(0, 0, 4, 3, 2, 1)
leadervalues[9] = new Array(0, 4, 4, 3, 3, 2, 2)
leadervalues[10] = new Array(0, 5, 4, 3, 2, 2)

function calcStr() {
  var faction = $( "#faction" ).children("option:selected").val()
  var forces = parseInt($( "#forces" ).val())
  var stars = parseInt($( "#stars" ).val())
  var spice = parseInt($( "#spice" ).val())
  var karamaed = $( '#karamaed' ).is(":checked")
  var strength = 0

  switch (faction) {
    case '3':
      strength = (forces + (2*stars) + spice + Math.min(stars, spice)) / 2
      break
    case '4':
      if (karamaed)
        strength = (forces + (2*stars) + spice + Math.min(stars, spice)) / 2
      else
        strength = forces + (2*stars)
      break
    case '6':
      strength = (forces / 2) + stars + Math.min(stars, spice)
      break
    default:
      strength = (forces + spice) / 2
  }
  $( "#strength" ).val( strength.toString() )
  var totalstrength = (strength + leaderstrength)
  $( "#total-strength" ).val( totalstrength.toString() )
}

function validateForces() {
  var forces = parseInt($( "#forces" ).val())
  var stars = parseInt($( "#stars" ).val())

  var forces_max = parseInt($( "#forces" ).attr( "max" ))
  var stars_max = parseInt($( "#stars" ).attr( "max" ))

  if (forces > forces_max)
    $( "#forces" ).val( forces_max )
  if (stars > stars_max)
    $( "#stars" ).val( stars_max )

  if (forces < 0)
    $( "#forces" ).val( 0 )
  if (stars < 0)
    $( "#stars" ).val( 0 )

}

//Harkonnen hostage faction select
function factionclick(faction){
	hostagefaction = faction
	$( "#leader1-button" ).attr("src", `img/leaders/${faction}-leader-1.png`)
	$( "#leader2-button" ).attr("src", `img/leaders/${faction}-leader-2.png`)
	$( "#leader3-button" ).attr("src", `img/leaders/${faction}-leader-3.png`)
	$( "#leader4-button" ).attr("src", `img/leaders/${faction}-leader-4.png`)
	$( "#leader5-button" ).attr("src", `img/leaders/${faction}-leader-5.png`)
	$( "#no-leader-column" ).addClass( "is-hidden" )
	$( "#faction-grid" ).addClass( "is-hidden" )
	$( "#leader-columns" ).removeClass( "is-hidden" )
}

//General leader selection
function noleaderclick(){
	hostagefaction = 0
	var faction = $( "#faction" ).children( "option:selected" ).val()
	$( "#leader1-button" ).attr("src", `img/leaders/${faction}-leader-1.png`)
	$( "#leader2-button" ).attr("src", `img/leaders/${faction}-leader-2.png`)
	$( "#leader3-button" ).attr("src", `img/leaders/${faction}-leader-3.png`)
	$( "#leader4-button" ).attr("src", `img/leaders/${faction}-leader-4.png`)
	$( "#leader5-button" ).attr("src", `img/leaders/${faction}-leader-5.png`)
	$( "#no-leader-column" ).addClass( "is-hidden" )
	$( "#faction-grid" ).addClass( "is-hidden" )
	$( "#leader-killed-button" ).addClass( "is-hidden" )
	$( "#treachery-columns" ).addClass( "is-hidden" )
	$( "#leader-columns" ).removeClass( "is-hidden" )
	$( "#cheap-hero-column" ).removeClass( "is-hidden" )
	switch (faction) {
		//Harkonnen
		case '5':
		$( "#captured-leader-column" ).removeClass( "is-hidden" )
		break
		//CHOAM
		case '9':
		$( "#leader6-column" ).removeClass( "is-hidden" )
		$( "#leader6-button" ).attr("src", `img/leaders/${faction}-leader-6.png`)
		break
	}
}

function clearTreachery(){
			$( "#weapon-icon" ).addClass( "is-hidden" )
			$( "#weapon-icon2" ).addClass( "is-hidden" )
			$( "#weapon-icon-label" ).addClass( "is-hidden" )
			$( "#defense-icon" ).addClass( "is-hidden" )
			$( "#defense-icon2" ).addClass( "is-hidden" )
			$( "#defense-icon-label" ).addClass( "is-hidden" )
}

//General leader select
function leaderclick(leaderint){
	{var faction = $( "#faction" ).children( "option:selected" ).val()}
	$( "#no-leader-column" ).removeClass( "is-hidden" )
	$( "#leader-columns" ).addClass( "is-hidden" )
	$( "#cheap-hero-column" ).addClass( "is-hidden" )
	$( "#captured-leader-column" ).addClass( "is-hidden" )
	$( "#leader6-column" ).addClass( "is-hidden" )
	//Leader is killed
	if (leaderint == 99)
	{
		$( "#no-leader-button" ).attr("src", `img/leaders/leader-killed.png`)
		$( "#leader-killed-button" ).addClass( "is-hidden" )
		leaderstrength = 0
		calcStr()
	}
	else
	{
	//Leader is a Harkonnen hostage
	if (faction == 5 && hostagefaction > 0)
	{
		$( "#no-leader-button" ).attr("src", `img/leaders/${hostagefaction}-leader-${leaderint}.png`)
		$( "#leader-killed-button" ).removeClass( "is-hidden" )
		leaderstrength = leadervalues[hostagefaction][leaderint]
		$( "#treachery-columns" ).removeClass( "is-hidden" )
		calcStr()
	}
	else
	{
		switch (leaderint) {
			//No Leader
			case -1:
				$( "#no-leader-button" ).attr("src", `img/leaders/no-leader.png`)
				$( "#leader-killed-button" ).addClass( "is-hidden" )
				$( "#treachery-columns" ).addClass( "is-hidden" )
				$( "#weapon" ).val(0)
				$( "#defense" ).val(0)
				clearTreachery()
				leaderstrength = 0
				calcStr()
			break
			//Cheap Hero
			case 0:
				$( "#no-leader-button" ).attr("src", `img/leaders/leader-0.png`)
				$( "#leader-killed-button" ).removeClass( "is-hidden" )
				leaderstrength = 0
				$( "#treachery-columns" ).removeClass( "is-hidden" )
				calcStr()
			break
			//Captured leader selection
			case 10:
				$( "#no-leader-column" ).addClass( "is-hidden" )
				$( "#faction-grid" ).removeClass( "is-hidden" )
			break
			//Everyone else
			default:
				$( "#no-leader-button" ).attr("src", `img/leaders/${faction}-leader-${leaderint}.png`)
				$( "#leader-killed-button" ).removeClass( "is-hidden" )
				leaderstrength = leadervalues[faction][leaderint]
				$( "#treachery-columns" ).removeClass( "is-hidden" )
				calcStr()
			break
		}
	}
	}
}

function validateSpice() {
  var spice = parseInt($( "#spice" ).val())
  var spice_max = 0

  if ($( "#faction" ).children("option:selected").val() == '6') {
    spice_max = parseInt($( "#stars" ).val())
  } else {
    spice_max = parseInt($( "#forces" ).val()) + parseInt($( "#stars" ).val())
  }

  $( "#spice" ).attr("max", spice_max)

  if (spice > spice_max)
    $( "#spice" ).val( spice_max )

  if (spice < 0)
    $( "#spice" ).val( 0 )

}

jQuery( document ).ready(function($) {
  $( "#faction" ).on("change", function(){
    var faction = $( "#faction" ).children( "option:selected" ).val()
    $( "#forces-column" ).addClass( "is-hidden" )
    $( "#stars-column" ).addClass( "is-hidden" )
    $( "#spice-column" ).addClass( "is-hidden" )
    $( "#strength-column" ).addClass( "is-hidden" )
	$( "#total-strength-column" ).addClass( "is-hidden" )
    $( "#karamaed-container" ).addClass( "is-hidden" )
    $( "#karamaed" ).prop( "checked", false )
    $( "#forces" ).val("0")
    $( "#stars" ).val("0")
    $( "#spice" ).val("0")
    $( "#strength" ).val("0")
    $( "#faction-icon" ).attr("src", `img/${faction}.png`)

	leaderclick(-1)
	
    switch (faction) {
      // No faction
      case '0':
		$( "#no-leader-column" ).addClass( "is-hidden" )
		$( "#leader-killed-button" ).addClass( "is-hidden" )
        // console.log("no faction")
        break
      // Emperor
      case '3':
        // console.log("emperor")
        $( "#forces-label" ).text( "Ordinary Forces" )
        $( "#stars-label" ).text( "Sardaukar (★)" )
        $( "#forces" ).attr( "max", 15 )
        $( "#stars" ).attr( "max", 5 )
        $( "#forces-column" ).removeClass( "is-hidden" )
        $( "#stars-column" ).removeClass( "is-hidden" )
        $( "#strength-column" ).removeClass( "is-hidden" )
		$( "#total-strength-column" ).removeClass( "is-hidden" )
        $( "#spice-column" ).removeClass( "is-hidden" )
        break
      // Fremen
      case '4':
        // console.log("fremen")
        $( "#forces-label" ).text( "Ordinary Forces" )
        $( "#stars-label" ).text( "Fedaykin (★)" )
        $( "#forces" ).attr( "max", 17 )
        $( "#stars" ).attr( "max", 3 )
        $( "#forces-column" ).removeClass( "is-hidden" )
        $( "#stars-column" ).removeClass( "is-hidden" )
        $( "#strength-column" ).removeClass( "is-hidden" )
		$( "#total-strength-column" ).removeClass( "is-hidden" )
        $( "#karamaed-container" ).removeClass( "is-hidden" )
        break
      // Ixians
      case '6':
        // console.log("ixians")
        $( "#forces-label" ).text( "Suboids" )
        $( "#stars-label" ).text( "Cyborgs (★)" )
        $( "#forces" ).attr( "max", 13 )
        $( "#stars" ).attr( "max", 7 )
        $( "#forces-column" ).removeClass( "is-hidden" )
        $( "#stars-column" ).removeClass( "is-hidden" )
        $( "#strength-column" ).removeClass( "is-hidden" )
		$( "#toal-strength-column" ).removeClass( "is-hidden" )
        $( "#spice-column" ).removeClass( "is-hidden" )
        break
      // Other factions
      default:
        // console.log("other")
        $( "#forces-label" ).text( "Forces" )
        $( "#stars-label" ).text( "" )
        $( "#forces" ).attr( "max", 20 )
        $( "#stars" ).attr( "max", 0 )
        $( "#forces-column" ).removeClass( "is-hidden" )
        $( "#strength-column" ).removeClass( "is-hidden" )
		$( "#total-strength-column" ).removeClass( "is-hidden" )
        $( "#spice-column" ).removeClass( "is-hidden" )	
    }
	
  })

  $( "#karamaed" ).on("change", function(){
    if ($( '#karamaed' ).is(":checked")) {
      $( "#spice-column" ).removeClass( "is-hidden" )
    } else {
      $( "#spice-column" ).addClass( "is-hidden" )
    }
    $( "#spice" ).val( "0" )
    calcStr()
  })

  $( "#forces, #stars, #spice" ).on("change", function(){
    validateForces()
    validateSpice()
    calcStr()
  })
  
  $( "#weapon" ).on("change", function(){
	var weapon = parseInt($( "#weapon" ).children( "option:selected" ).val())
	$( "#weapon-icon" ).addClass( "is-hidden" )
	$( "#weapon-icon2" ).addClass( "is-hidden" )
	$( "#weapon-icon-label" ).addClass( "is-hidden" )	
	switch (true) {
		//Projectile Weapons
		case (weapon > 0 && weapon <= 5):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/projectile-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("Keep if battle is won")
		break
		//Poison Weapons
		case (weapon > 5 && weapon <= 10):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/poison-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("Keep if battle is won")
		break
		//Poison Tooth
		case (weapon == 11):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/poison-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("(Choice to use after reveal) <br /> Both leaders die <br /> Snooper does not protect <br /> Discard if used <br> Keep if battle is won and not used")
		break
		//Artillery Strike
		case (weapon == 12):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/projectile-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("Both leaders die <br /> (No spice payout) <br /> Shields protect <br /> Leaders do not add to strength <br /> Discard after use")
		break
		//Lasgun
		case (weapon == 13):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/special-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("No defense against lasgun <br /> Lasgun + Shield = Boom <br /> Keep if battle is won")
		break
		//Poison Blade
		case (weapon == 14):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/projectile-weapon-icon.png`)
			$( "#weapon-icon2" ).removeClass( "is-hidden" )
			$( "#weapon-icon2" ).attr("src", `img/weapon-icons/poison-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("Keep if battle is won")
		break
		//Weirding Way
		case (weapon == 15):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/projectile-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("Keep if battle is won")
		break
		//Chemistry
		case (weapon == 16):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/poison-weapon-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("Needs to be played with <br /> a defense to be a weapon <br /> Keep if battle is won")
			break
		//Worthless
		case (weapon > 16 && weapon <= 22):
			$( "#weapon-icon" ).removeClass( "is-hidden" )
			$( "#weapon-icon" ).attr("src", `img/weapon-icons/worthless-icon.png`)
			$( "#weapon-icon-label" ).removeClass( "is-hidden" )
			$( "#weapon-icon-label" ).html("Worthless <br /> Discard after use")
		break
		default:
			$( "#weapon-icon" ).addClass( "is-hidden" )
			$( "#weapon-icon2" ).addClass( "is-hidden" )
			$( "#weapon-icon-label" ).addClass( "is-hidden" )
		break
	}
  })
  $( "#defense" ).on("change", function(){
	var defense = parseInt($( "#defense" ).children( "option:selected" ).val())
	$( "#defense-icon" ).addClass( "is-hidden" )
	$( "#defense-icon2" ).addClass( "is-hidden" )
	$( "#defense-icon-label" ).addClass( "is-hidden" )
	switch (true) {
		//Shield
		case (defense == 1):
			$( "#defense-icon" ).removeClass( "is-hidden" )
			$( "#defense-icon" ).attr("src", `img/weapon-icons/projectile-defense-icon.png`)
			$( "#defense-icon-label" ).removeClass( "is-hidden" )
			$( "#defense-icon-label" ).html("Keep if battle is won")
		break
		//Snooper
		case (defense == 2):
			$( "#defense-icon" ).removeClass( "is-hidden" )
			$( "#defense-icon" ).attr("src", `img/weapon-icons/poison-defense-icon.png`)
			$( "#defense-icon-label" ).removeClass( "is-hidden" )
			$( "#defense-icon-label" ).html("Keep if battle is won")
		break
		//Chemistry
		case (defense == 3):
			$( "#defense-icon" ).removeClass( "is-hidden" )
			$( "#defense-icon" ).attr("src", `img/weapon-icons/poison-defense-icon.png`)
			$( "#defense-icon-label" ).removeClass( "is-hidden" )
			$( "#defense-icon-label" ).html("Keep if battle is won")
		break
		//Shield Snooper
		case (defense == 4):
			$( "#defense-icon" ).removeClass( "is-hidden" )
			$( "#defense-icon" ).attr("src", `img/weapon-icons/projectile-defense-icon.png`)
			$( "#defense-icon2" ).removeClass( "is-hidden" )
			$( "#defense-icon2" ).attr("src", `img/weapon-icons/poison-defense-icon.png`)
			$( "#defense-icon-label" ).removeClass( "is-hidden" )
			$( "#defense-icon-label" ).html("Keep if battle is won")
		break
		//Weirding Way
		case (defense == 5):
			$( "#defense-icon" ).removeClass( "is-hidden" )
			$( "#defense-icon" ).attr("src", `img/weapon-icons/projectile-defense-icon.png`)
			$( "#defense-icon-label" ).removeClass( "is-hidden" )
			$( "#defense-icon-label" ).html("Needs to be played with <br /> a weapon to be a defense <br /> Keep if battle is won")
		break
		//Worthless
		case (defense > 5 && defense <= 11):
			$( "#defense-icon" ).removeClass( "is-hidden" )
			$( "#defense-icon" ).attr("src", `img/weapon-icons/worthless-icon.png`)
			$( "#defense-icon-label" ).removeClass( "is-hidden" )
			$( "#defense-icon-label" ).html("Worthless <br /> Discard after use")
		break
		default:
			$( "#defense-icon" ).addClass( "is-hidden" )
			$( "#defense-icon2" ).addClass( "is-hidden" )
			$( "#defense-icon-label" ).addClass( "is-hidden" )
		break
	}
  })
})