
// https://www.fightcade.com/id/d.i.n.o

let urlChars = 
[
	{
		gif: 'images/chars/Terrygarou.webp',
		portrait: 'images/portraits/0.gif'
	},
	{
		gif: 'images/chars/Rock-sprite3.webp',
		portrait: 'images/portraits/1.gif'
	},
	{
		gif: 'images/chars/Jenet-sprite1.webp',
		portrait: 'images/portraits/2.gif'
	},
	{
		gif: 'images/chars/Donghwan-sprite1.webp',
		portrait: 'images/portraits/3.gif'
	},
	{
		gif: 'images/chars/Kimjaehoongarou.webp',
		portrait: 'images/portraits/4.gif'
	},
	{
		
		gif: 'images/chars/Hotaru-sprite1.webp',
		portrait: 'images/portraits/5.gif'
	},
	{
		gif: 'images/chars/Gato-sprite1.webp',
		portrait: 'images/portraits/6.gif'
	},
	{
		gif: 'images/chars/Tizocgarou.webp',
		portrait: 'images/portraits/7.gif'
	},
	{
		gif: 'images/chars/Butt-sprite1.webp',
		portrait: 'images/portraits/8.gif'
	},
	
	{
		gif: 'images/chars/Hokutomaru-sprite1.webp',
		portrait: 'images/portraits/9.gif'
	},
	{
		gif: 'images/chars/Kevin-sprite1.webp',
		portrait: 'images/portraits/10.gif'
	},
	{
		gif: 'images/chars/Freeman-sprite1.webp',
		portrait: 'images/portraits/11.gif'
	},
	{
		gif: 'images/chars/Grant_posing.webp',
		portrait: 'images/portraits/12.png'
	},
	{
		gif: 'images/chars/Snk-kain.webp',
		portrait: 'images/portraits/13.gif'
	}

];

 let ArrChars = ['Terry Bogard', 'Rock Howard','B. Jenet', 'Kim Dong Hwan', 'Kim Jae Hoon', 
 'Hotaro Futaba', 'Gato', 'Tizoc', 'Marco Rodrigues', 'Hokutomaru', 'Kevin Rian', 'Freeman',
'Grant', 'Kain R. Heinlein' ];


// -- OBTEM PERSONAGEM SELECIONADO -- 

$('#chars').change(function(){
	
    let charId = $('#chars').val();
	
	$('#charImg').attr('src', urlChars[charId].gif);
	$('#portChars').attr('src', urlChars[charId].portrait);
	
});
