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

$( document ).ready(function() {
  $( "#faction" ).on("change", function(){
    var faction = $( "#faction" ).children( "option:selected" ).val()
    $( "#forces-column" ).addClass( "is-hidden" )
    $( "#stars-column" ).addClass( "is-hidden" )
    $( "#spice-column" ).addClass( "is-hidden" )
    $( "#strength-column" ).addClass( "is-hidden" )
    $( "#karamaed-container" ).addClass( "is-hidden" )
    $( "#karamaed" ).prop( "checked", false )
    $( "#forces" ).val("0")
    $( "#stars" ).val("0")
    $( "#spice" ).val("0")
    $( "#strength" ).val("0")
    $( "#faction-icon" ).attr("src", `img/${faction}.png`)
    switch (faction) {
      // No faction
      case '0':
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
})
