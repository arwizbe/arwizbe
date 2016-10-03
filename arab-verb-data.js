// defines 3 functions:
// selectVerb - applies verb selection update
// loadVerbList - upload group list of verb lists
// selectVerbList - updates list of verbs to select

function showLBBot() {
  //show verb list selection page in left bar
  $("#lbtop").addClass(".ui-screen-hidden")
  $("#lbmid").addClass("ui-screen-hidden")
  $("#lbbot").removeClass("ui-screen-hidden")
  $("#close").removeClass("ui-screen-hidden").removeClass("ui-btn-active")
  $("#Base").parent().removeClass("ui-btn-active")
//  $("#close").attr("href","#LBMID")
  $("#verbl").addClass("ui-screen-hidden")
  $("#apply").removeClass("ui-screen-hidden")
  if( !fC ) {
	$("#checkC").prop("checked", false).checkboxradio("refresh")
	$("#checkC").parent().toggleClass("ui-state-disabled",!fL)
  }	  
  $("#leftpagepanel").animate({ scrollTop: 0 });
    $(".ui-rbtn-left").addClass("ui-screen-hidden") 
    $(".ui-rbtn-right").addClass("ui-screen-hidden")

}

function showLBTop() { 
  //show verb conjugation page in left bar
  $("#lbtop").removeClass("ui-screen-hidden")
  $("#lbmid").addClass("ui-screen-hidden")
  $("#lbbot").addClass("ui-screen-hidden")
  $("#close").addClass("ui-screen-hidden")
  $("#verbl").addClass("ui-screen-hidden")
  $("#apply").addClass("ui-screen-hidden")
  $("#leftpagepanel").animate({ scrollTop: 0 });
    $(".ui-rbtn-left").toggleClass("ui-screen-hidden", (all_verbs.indexOf(v_code.slice(1,7)) == 0)) 
    $(".ui-rbtn-right").toggleClass("ui-screen-hidden", (all_verbs.indexOf(v_code.slice(1,7))+6 == all_verbs.length))
}

function showLBMid() { 
  //show verb selection page in left bar
  $("#lbtop").addClass("ui-screen-hidden")
  $("#lbmid").removeClass("ui-screen-hidden")
  $("#lbbot").addClass("ui-screen-hidden")
  $("#close").removeClass("ui-screen-hidden").removeClass("ui-btn-active")
//  $("#close").attr("href","#LBTOP")
  $("#verbl").removeClass("ui-screen-hidden")
  $("#apply").addClass("ui-screen-hidden")
  $("#leftpagepanel").animate({ scrollTop: 0 });
    $("#VL").html(lhtml)
  $("#FilterListView").focus()
    $(".ui-rbtn-left").addClass("ui-screen-hidden") 
    $(".ui-rbtn-right").addClass("ui-screen-hidden")
}

function logFunctionTime( text ) {
  var d = new Date();
  console.log(text + " " + (d.getSeconds()*1000 + d.getMilliseconds()) )  
}

function selectVerb( )
{ logFunctionTime("selectVerb-begin") 
  $.getJSON( "V"+v_code.slice(2,4)+".json").done( function( data ) {
    logFunctionTime("selectVerb")
	sel_verbs = data
	val = data[v_code]
	
      group = full_group_list[val.G].G
	  $(".id-rel-verb").toggleClass("ui-screen-hidden",group == "")
	  html = '<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child">based upon root</li>'
	  while (group.length > 0) {
	    g_sel = group.slice(0,5)
		if("#V"+g_sel == v_code) {
          html += '<li class="ui-state-disabled"><a href="#V' + g_sel + '" class="ui-btn"><span class="ui-li-aside">' + sel_verbs["#V"+g_sel].A + '</span>' + sel_verbs["#V"+g_sel].N + '</a></li>' ; }
		else {
          html += '<li><a href="#V' + g_sel + '" class="ui-btn"><span class="ui-li-aside">' + sel_verbs["#V"+g_sel].A + '</span>' + sel_verbs["#V"+g_sel].N + '</a></li>' ; }
		group = group.slice(6,group.length)
	  }
	  $("#VRL").html(html)

	//show static content (translations and CLT/501 references)
    $("#NL").html(val.N);
    $("#EN").html(val.E);
    $("#CLT").html(val.C).toggleClass("ui-screen-hidden",( val.C.length == 0));
    $("#IND").html(val.F).toggleClass("ui-screen-hidden",( val.F.length == 0));
    $("#VUW").toggleClass("ui-screen-hidden", ( val.U.length == 0 ) )
    $("#UW").html(val.U); 
	
	if( val.P.slice(0,2) == "AP" )
    { $("#ActPas").flipswitch( "option", "disabled", false )
	  $("#ActPas").val(actpasDef).flipswitch("refresh")
	} else if ( val.P.slice(0,1) == "A" )
	{ $("#ActPas").flipswitch( "option", "disabled", true )
	  $("#ActPas").val("A").flipswitch("refresh")
	} else if ( val.P.slice(1,2) == "P" )
	{ $("#ActPas").flipswitch( "option", "disabled", true )
	  $("#ActPas").val("P").flipswitch("refresh")
	}

	//Calculate active and passive conjugations
	hActive = true
	hPassive = true
	Voptions = val.V
	Vactive = val.V.slice(0,1)
	Toptions = val.T
	Tactive = val.T.slice(0,1)
	paplural = false
	ppplural = false
	if(val.P.length > 2) {
	paplural = (val.P.slice(2,3) == "+") 
	}
    paplural = paplural || (val.N.indexOf("samen ") > -1) || (val.N.indexOf("elkaar ") > -1)

	StP(val.A + "-" + val.B, val.V, val.T, val.M, "P", val.N, val.E, val.C, val.F, val.U)
	ppttvorm1 = pttvorm1
	ppttvorm2 = pttvorm2
	ppvtvorm1 = pvtvorm1
	ppvtvorm2 = pvtvorm2
	pphulp = phulp
    if(val.P.slice(1,2) == "P" ) {
      hPassive = false	  
	  showTense("CP1P","X")
	  $(".lnk-CP1 > a > .id-sc").html(rv13M)  
	  showTense("CP2P","X")
	  $(".lnk-CP2 > a > .id-sc").html(rv13M)  
	  showTense("CP3P","X")
	  $(".lnk-CP3 > a > .id-sc").html(rv13M)  
	  showTense("CP4P","X")
	  $(".lnk-CP4 > a > .id-sc").html(rv13M)  
	  showTense("CP7P","X")
	  $(".lnk-CP7 > a > .id-sc").html(rv13M)  
	  }
	StP(val.A + "-" + val.B, Vactive, Tactive, val.M, "A", val.N, val.E, val.C, val.F, val.U)
	pattvorm1 = pttvorm1
	pattvorm2 = pttvorm2
	pavtvorm1 = pvtvorm1
	pavtvorm2 = pvtvorm2
	pahulp = phulp
	if(val.P.slice(0,1) == "A" ) {
      hActive = false	
	  showTense("CA1P","X")
	  $(".lnk-CA1 > a > .id-sc").html(rv13M)  
	  showTense("CA2P","X")
	  $(".lnk-CA2 > a > .id-sc").html(rv13M)  
	  showTense("CA3P","X")
	  $(".lnk-CA3 > a > .id-sc").html(rv13M)  
	  showTense("CA4P","X")
	  $(".lnk-CA4 > a > .id-sc").html(rv13M)  
	  showTense("CA5P","X")
	  $(".lnk-CA5 > a > .id-sc").html(rv12M)  
	  showTense("CA6P","X")
	  $(".lnk-CA6 > a > .id-sc").html(rv13M)  
	  showTense("CA7P","X")
	  $(".lnk-CA7 > a > .id-sc").html(rv13M)  
	  }

    // Hide passive participle if - mentioned
    $("#PPT").toggleClass("ui-screen-hidden", val.P.slice(1,2) == "-"  )
    $("#PPV").toggleClass("ui-screen-hidden", val.P.slice(1,2) == "-" )

    //Set Negative to unselected	
	checkN = $("#checkN")
	if( checkN.prop("checked") ) {
	  checkN.attr("checked",false).checkboxradio("refresh") }
	  
	 //Update the conjugations and collapse the conjugations 
    if( fullDisp ) { 
	  updateTenseTable() }
	else {
		temp = $("#Base").html()
	    if( temp.indexOf(" ") > 0 ) {
 	      temp = temp.slice(0,temp.indexOf(" "))
	    }
    $(".ui-rbtn-left").toggleClass("ui-screen-hidden", (all_verbs.indexOf(v_code.slice(1,7)) == 0)) 
    $(".ui-rbtn-right").toggleClass("ui-screen-hidden", (all_verbs.indexOf(v_code.slice(1,7))+6 == all_verbs.length))
	}	
	logFunctionTime("selectVerb-end")
  }); 
  if(localStorage) {
    localStorage.setItem('pvcode', v_code ); }
}

function reloadVerb( )
{ logFunctionTime("reloadVerb-begin") 
  $.getJSON( "V"+v_code.slice(2,4)+".json").done( function( data ) {
    logFunctionTime("reloadVerb")
	sel_verbs = data
	val = data[v_code]
	StP(val.A + "-" + val.B, Vactive, Tactive, val.M, "A", val.N, val.E, val.C, val.F, val.U)
	pattvorm1 = pttvorm1
	pattvorm2 = pttvorm2
	pavtvorm1 = pvtvorm1
	pavtvorm2 = pvtvorm2
	pahulp = phulp
	temp = $("#Base").html()
	if( temp.indexOf(" ") > 0 ) {
 	  temp = temp.slice(0,temp.indexOf(" "))
	}
	selectTense("R")
		$("#tt-vt").html(temp + " - " + "ي" + pattvorm1)
	logFunctionTime("reloadVerb-end")
  }); 
  if(localStorage) {
    localStorage.setItem('pvcode', v_code ); }
}



function getVerb( v_code )
{ logFunctionTime("getVerb-begin") 
  rPD = ""
  rAD = ""
  $.getJSON( "V"+v_code.slice(2,4)+".json").done( function( data ) {
    logFunctionTime("selectVerb")
	sel_verbs = data
	val = data[v_code]

	//show static content (translations and CLT/501 references
    $("#NL").html(val.N);
	
	//show active/passive toggle
	$("#ActPas").val("A")
	
	//Calculate active and passive conjugations
	hActive = true
	hPassive = true
	Voptions = val.V
	Vactive = val.V.slice(0,1)
	Toptions = val.T
	Tactive = val.T.slice(0,1)
	if(val.P.slice(0,1) == "A" ) {
	  StP(val.A + "-" + val.B, Vactive, Tactive, val.M, "A", val.N, val.E, val.C, val.F, val.U)
	  pattvorm1 = pttvorm1
	  pattvorm2 = pttvorm2
	  pavtvorm1 = pvtvorm1
	  pavtvorm2 = pvtvorm2
	  pahulp = phulp
      hActive = false	}
	paplural = false
	ppplural = false
	if(val.P.length > 2) {
	  paplural = (val.P.slice(2,3) == "+") }

    // Hide passive participle if - mentioned
    $("#PPT").toggleClass("ui-screen-hidden", val.P.slice(1,2) == "-"  )
    $("#PPV").toggleClass("ui-screen-hidden", val.P.slice(1,2) == "-" )

/*    showTense("CA1P","X") 
	rVT3 = rv13M
	rVT1 = rv11
    showTense("CA2P","X") 
	rTT3 = rv13M
	rTT1 = rv11
    showTense("CA5P","X") 
	rI2M = rv12M
	rI2V = rv12V

var html = '<tr><td class="ui-body-a"><span id="V511" class="ui-aside">' + rPD + '</span></td><td class="ui-body-a"><span id="V511" class="ui-aside">' + rAD  + '</span></td><td class="ui-body-a"><span id="V511" class="ui-aside">' + rTT1 + '</span></td><td class="ui-body-a"><span id="V511" class="ui-aside">' + rTT3 + '</span></td><td class="ui-body-a"><span id="V511" class="ui-aside">' + rVT1 + '</span></td><td class="ui-body-a"><span id="V511" class="ui-aside">' + rVT3 + '</span></td></tr>'
html += '<tr><td colspan="2" class="ui-body-a"><span id="V511" class="ui-aside">' + MasDar + '</span></td><td class="ui-body-a"><span id="V511" class="ui-aside">' + rI2V  + '</span></td><td class="ui-body-a"><span id="V511" class="ui-aside">' + rI2M + '</span></td><td colspan="2"  class="ui-body-a">' + val.N + '</td></tr>'
$("#rightpagepanel").append(html)*/
	logFunctionTime("selectVerb-end")
  }); 
}

function loadVerbList() {
  //load complete verb list
  logFunctionTime("loadVerbList-begin")
  $.getJSON( "G.json")
	.done( function( data ) {
	  console.log( data )
	  full_group_list = data
	  selectVerb()
		$.mobile.navigate("",  { reverse:true })
	  logFunctionTime("loadVerbList-G-end") } )

  $.getJSON( "V00.json")
	.done( function( data ) {
	  full_verb_list = data;
	  selectVerbList("");
	  logFunctionTime("loadVerbList-V-end"); } )
  //process complete verb list, create filter page
  //to be implemented
}

function selectVerbList( verb_list ) {
  logFunctionTime("selectVerbList-start " + verb_list)
  all_verbs = ""
  var add_entry
  var slist = "I   II  III IV  V   VI  VII VIIIIX  X   XI  XII XIIIXIV XV  16  17  18  19  20  QI  QII QIIIQIV "
  var verb_count = 0
  var cumulate = false;
  var stext = $("#FilterListView").val()
  var fR, fA, fH, FB, fG
  fN = (fT && fTv == 1)
  fA = (fT && fTv == 2)
  fH = (fT && fTv == 3)
  fB = (fT && fTv == 4)
  fG = (fT && fTv == 5)
  fZ = (fT && fTv == 6)
  fD = (fT && fTv == 7)
  console.log(stext)
  if( (typeof stext === 'undefined') ) {
	 fS = false;
    fR = false; }
  else {
    var l_stext = stext.length
    if( (l_stext > 2) && (stext.charCodeAt(0) > 1000 ) && (stext.slice(l_stext-2,l_stext-1) == stext.slice(l_stext-1,l_stext)) ) {
	  stext = stext.slice(0,l_stext-1) + "ّ"
      $("#FilterListView").val(stext).textinput("refresh") }
	console.log($("#FilterListView").val())
    fS = (stext.length > 0) && !(stext.slice(0,1) == ".")
    fR = (stext.length > 1) && (stext.slice(0,1) == ".") 
  stext = (fR ? stext.slice(1,stext.length).toLowerCase() : stext.toLowerCase() ) }
  html = ""
  if( fL || fF || fT ) {
    fhtml = '<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child">F: Spec'; }
  else {
    fhtml = '<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child">F: Spec'; } 
  fhtml =  fhtml + (fS ? " + text" : "")
  fhtml =  fhtml + (fR ? " + root" : "")  
  fhtml += ', S:' + ($("#checkS").prop("checked") ? " verb root" : " full verb")
  if($("#checkS").prop("checked")) {
    //complete sorted on root
	sort_list = full_verb_list.C0
	total_verb = sort_list.length / 5
	for ( t = 0 ; t < total_verb ; t++ ) {
	  key = "#V"+sort_list.slice(t*5,(t+1)*5)
	  val = full_verb_list[key]
	  add_entry = true
	  if (fL && (fC ? !(Number(val.C) <= fLv && Number(val.C)>0) : !(Number(val.C) == fLv))) { add_entry = false; }
	    else if (fF && !((Number(val.S) == fFv) ||
		                 ((fFv == 11) && (Number(val.S) > 10) && (Number(val.S)<20)) ||
						 ((fFv == 21) && (Number(val.S) > 20)))) { add_entry = false; }
//	  else if (fF && !(Number(val.S) == fFv)) { add_entry = false; }
  	  else if( fS && (val.A + val.N).indexOf(stext) == -1) { add_entry = false }
	  else {
		gval = full_group_list[val.G].R  
		if( fR && !(gval.indexOf(stext) == 0) ) { add_entry = false; }
		else if( fA && !("وي".indexOf(gval.slice(0,1))>-1) ) { add_entry = false; }
		else if( fH && !("وي".indexOf(gval.slice(1,2))>-1) ) { add_entry = false; }
        else if( fB && !("وي".indexOf(gval.slice(2,3))>-1) ) { add_entry = false; }
        else if( fG && !(gval.slice(1,2) == gval.slice(2,3)) ) { add_entry = false; }		
        else if( fN && !(gval.indexOf("و")==-1 && gval.indexOf("ي")==-1) ) { add_entry = false; }		
        else if( fZ && !(gval.indexOf("أ")>-1 || gval.indexOf("ء")>-1) ) { add_entry = false; }		
        else if( fD && !((("وي".indexOf(gval.slice(0,1))>-1 ? 1 : 0) + ("وي".indexOf(gval.slice(1,2))>-1 ? 1 : 0) + ("وي".indexOf(gval.slice(2,3))>-1 ? 1 : 0))>1) ) { add_entry = false; }		
	  }
	  if ( add_entry ) {
		if(verb_list != "L" ) {
		html += '<li><a href="' + key + '" class="ui-btn"><span class="ui-li-aside">' + val.A + '</span>' + val.N + '</a></li>' ; 
		all_verbs += key.slice(1,7)}
	  else {
	  getVerb(key) }
		verb_count++; }
	  else if (key == v_code ) {
		  all_verbs += key.slice(1,7) }
	}
  }
  else {
    //walk through list
    $.each( full_verb_list, function( key, val ) {
      if( key.slice(1,2) == "V" ) {
	    add_entry = true
	    if (fL && (fC ? !(Number(val.C) <= fLv && Number(val.C)>0) : !(Number(val.C) == fLv))) { add_entry = false; }
	    else if (fF && !((Number(val.S) == fFv) ||
		                 ((fFv == 11) && (Number(val.S) > 10) && (Number(val.S)<20)) ||
						 ((fFv == 21) && (Number(val.S) > 20)))) { add_entry = false; }
  	    else if( fS && (val.A + val.N).indexOf(stext) == -1) { add_entry = false }
	  else {
		gval = full_group_list[val.G].R
		if( fR && !(gval.indexOf(stext) == 0) ) { add_entry = false; }
		else if( fA && !("وي".indexOf(gval.slice(0,1))>-1) ) { add_entry = false; }
		else if( fH && !("وي".indexOf(gval.slice(1,2))>-1) ) { add_entry = false; }
        else if( fB && !("وي".indexOf(gval.slice(2,3))>-1) ) { add_entry = false; }
        else if( fG && !(gval.slice(1,2) == gval.slice(2,3)) ) { add_entry = false; }		
        else if( fN && !(gval.indexOf("و")==-1 && gval.indexOf("ي")==-1) ) { add_entry = false; }		
        else if( fZ && !(gval.indexOf("أ")>-1 || gval.indexOf("ء")>-1) ) { add_entry = false; }		
        else if( fD && !((("وي".indexOf(gval.slice(0,1))>-1 ? 1 : 0) + ("وي".indexOf(gval.slice(1,2))>-1 ? 1 : 0) + ("وي".indexOf(gval.slice(2,3))>-1 ? 1 : 0))>1) ) { add_entry = false; }		
	  }
	  if ( add_entry ) {
		if(verb_list != "L" ) {
		  html += '<li><a href="' + key + '" class="ui-btn"><span class="ui-li-aside">' + val.A + '</span>' + val.N + '</a></li>' ; 
		  all_verbs += key.slice(1,7)}
	    else {
	      getVerb(key) }
		verb_count++; }
	  else if (key == v_code ) {
		  all_verbs += key.slice(1,7) }
	  }
	});
  }
  if( !fullDisp ) {
  $(".id-nav.ui-rbtn-left").toggleClass("ui-screen-hidden", (all_verbs.indexOf(v_code.slice(1,7)) == 0)) 
  $(".id-nav.ui-rbtn-right").toggleClass("ui-screen-hidden", (all_verbs.indexOf(v_code.slice(1,7))+6 == all_verbs.length))}
	  
  if( verb_count == 0 ) {
    html = '<li class="ui-btn">No verbs found</li>' }
  logFunctionTime("selectVerbList-refresh")
  $(".id-v-count").html(verb_count)
  if(verb_list != "L" ) {
    lhtml = fhtml + '<span class="ui-li-count ui-body-inherit">'+verb_count+'</span>'+ html }
  logFunctionTime("selectVerbList-string")
  logFunctionTime("selectVerbList-end ("+verb_count+")")
}