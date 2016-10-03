//version 2013-06-03f

function StP(control,VH,TH,Mcode,Pcode,vertNL,vertEN,indCLT,ind501,UW) {
  logFunctionTime("StP")	
// control : verb in past tense 3rd person sing 
// VH: help letter past tense
// TH: help letter present tense
// Mcode: code used to defined MasDar (mostly for Stam I, but possible for others)
// Pcode: indicator whether Passive mode exists
// vertNL: Dutch translation
// vertEN: English translation
// indCLT: indication of where verb introduced in CLT classes
// ind501: page number for verb in 501 Arabic verbs (if present)
// UW: indicator of possible adjectives to use with verb
  VH = VH.slice(0,0+1)
  TH = TH.slice(0,0+1)
  //extract base letters of verb if mentionned
  //to be added: extract verb form if mentionned
  var bls = ""
  if( control.indexOf("-") > -1) { 
    bls = control.slice(control.indexOf("-")+1,control.length)
    control = control.slice(0,control.indexOf("-")) }

  var cls = ""
  if( control.indexOf(" ") > -1) { 
    cls = control.slice(control.indexOf(" ")+1,control.length)
    control = control.slice(0,control.indexOf(" ")) }

  console.log(cls)

	
  var stam = "<sup>FORM ";
  var hulp = ""
  var vtvorm =""
  var vtvorm1 =""
  var vtvorm2 =""
  var bl1 = ""
  var bl2 = ""
  var bl3 = ""
  var bl4 = ""
  var APindex = Pcode.slice(0,1)
  vActive = ( APindex == "A" )
  if( !vActive ) {
	VH = ( VH == "" ? VH : "i" )
	TH = "a"}
  $("#APind").html(APindex)
  
// Identify different forms of verb ( I - XV, QI - QIV )	
	
  if( control.length == 3) {
    l1 = control.slice(0,1)
    l2 = control.slice(1,2)
    l3 = control.slice(2,3)
    ll =  l3
	bl1 = l1
	bl2 = l2
	bl3 = (l3 == "ى" ? "ي" : l3)
    if( l1 == "آ" ) { //form 3 or 4, identifier required
      stam += "IV"
	  bl1 = "أ"
      stamv = 4
      MasDar =  "الإِيْ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l3
      vtvorm = l1 + "َ" + l2 + "َ" + l3
      ttavorm = "ُؤْ" + l2 + "َ" + l3
      ttivorm = "ُؤْ" + l2 + "ِ" + l3
      ttvorm = ttivorm }
    else if (l1 == "أ" && bls == "رأي" ) { //special form 4
	  stam += "IV"
      stamv = 4
      MasDar =  "الإِ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l3 + "ءة"
      vtvorm = l1 + "َ" + l2 + "َ" + l3
      ttavorm = "ُ" + l2 + "َ" + l3
      ttivorm = "ُ" + l2 + "ِ" + l3
      ttvorm = ttivorm }
	else {//stam I
      stam += "I"
	  temp1 = ""
	  temp2 = ""
	  if( APindex == "P" ) {
	    k1 = "ُ" }
	  else {
	    k1 = "َ" }
	  if( l3 == "ي" || l3 == "ى" ) {
//		temp1 = "ي"
		temp1 = "ٍ"
//	    temp2 = "ٍ" }
	    temp2 = "ِيّ" }
	  else if (l3 == "ا") {
//		temp1 = "ي"		
		temp1 = "ٍ"
//	    temp2 = "ٍ" }
	    temp2 = "ُوّ" }
	  else if (l3 == "أ") {
	    temp1 = "ِئ"
	    temp2 = "ُوء" }
	  else {
	    temp1 = (l3 == "ّ" ? "" : "ِ") + l3
	    temp2 = "ُو" + (l3 == "ّ" ? l2 : l3) }
      if( l1 == "أ"  && vActive) {
        ttivorm = "آ" + l2 + temp1 }
      else {
        ttivorm = (l1 == "ل" ? "لا" : l1 + "َا" ) + (l2 == "أ" ? "ئ" : l2) + temp1 }
      ttavorm = "مَ" + l1 + "ْ" + (l2 == "أ" ? "ؤ" : l2) + temp2
	  if( l1 == "و" ) {
	    stam += "(a)" }
	  if( l2 == "ي" || l2 == "و") {
	    stam += "(h)" }
      if( l3 == "ّ" ) { //verdubbeling laatste medeklinker
        vtvorm = l1 + k1 + l2 + l3
        vtvorm1 = vtvorm
        l3 = l2
        hulp = "S"
        stam += "(g)"
        bl3 = l2
	    VH = (vActive ? "a"  : "i") }
	  else if ( l3 == "ا" ) {
	    bl3 = "و" }
      stamv = 1
	  console.log(VH)
      switch( VH ) {// definieer hulpklinker verleden tijd
        case "a":
          vtvorm2 = l1 + k1 + l2 + "َ" + l3;
          break;
        case "i":
          vtvorm2 = l1 + k1 + (l2 == "أ" ? "ئ" : l2 ) + "ِ" + (l3 == "أ" ? "ئ" : l3 );
          break;
        case "u":
          vtvorm2 = l1 + k1 + l2 + "ُ" + l3;
          break;
        default: // holle werkwoorden, geen korte klinker
          hulp = "H"
  	      stam += "(h)"
          ttivorm = l1 + "َائِ" + l3  //gebruikt voor actief deelwoord
          ttavorm = "مَ" + l1 + ( TH == "u" ? "ُو" : "ِي") + l3 //gebruikt voor passief deelwoord
		  console.log(ttavorm)
          vtvorm = l1 + (vActive ? "َ" + l2 : "ِي" ) + l3
          vtvorm1 = vtvorm
          if( TH == "u" ) { // korte klinker bepaald door hulpklinker in TT
            vtvorm2 = l1 + "ُ" + l3 }
          else {
            if( l3 == "ء") {
              vtvorm2 = l1 + "ِ" + "ئ" }
            else {
              vtvorm2 = l1 + "ِ" + l3 }
          }         
      }
      if( hulp == "" ) {
        vtvorm = vtvorm2 }
      ttvorm = ""
      ttvorm1 = ""
      ttvorm2 = ""
	  console.log(vActive + " " + VH)
      switch( TH ) { // definieer hulpklinker tegenwoordige tijd
        case "a":
          if( hulp == "H") { //hol werkwoord?
            bl2 = "و"
		    ttvorm1 = k1 + (l1 == "ل" ? "لا" : l1 + "َا" ) + l3
            ttvorm2 = k1 + l1 + "َ" + l3 }
          else if( l1 == "و" && hulp == "" && vActive) { // geassimileerd werkwoord?
            ttvorm1 = ttvorm2 = ttvorm = k1 + l2 + "َ" + l3 }
          else if( l1 == "و" && hulp == "") { // geassimileerd werkwoord?
            ttvorm1 = ttvorm2 = ttvorm = k1 + l1 + "ْ" + l2 + "َ" + l3 }
          else if( l2 == l3) {// dubbele eindklinker
            ttvorm1 = k1 + l1 + "َ" + l2 + "ّ"
            ttvorm2 = k1 + l1 + "ْ" + l2 + "َ" + l2 }
          else if( l1 == "أ") {// dubbele eindklinker
            ttvorm = k1 + "ؤ" + "َ" + l2 + "َ" + l3  }
          else {
            ttvorm = k1 + l1 + "ْ" + l2 + "َ" + l3 }
          break;
        case "i":
          if( hulp == "H" ) {
            bl2 = "ي"
		    ttvorm1 = k1 + l1 + "ِي" + l3
            ttvorm2 = k1 + l1 + "ِ" + l3 }
          else if( l1 == "و" && hulp == "" && vActive) {
            ttvorm1 = ttvorm2 = ttvorm = k1 + l2 + "ِ" + l3 }
          else if( l1 == "و" && hulp == "") { // geassimileerd werkwoord?
            ttvorm1 = ttvorm2 = ttvorm = k1 + l1 + "ْ" + l2 + "َ" + l3 }
          else if( l2 == l3) {
            ttvorm1 = k1 + l1 + "ِ" + l2 + "ّ"
            ttvorm2 = k1 + l1 + "ْ" + l2 + "ِ" + l2 }
          else {
            ttvorm = k1 + l1 + "ْ" + (l2 == "أ" ? "ئ" : l2) + "ِ" + (l3 == "أ" ? "ئ" : l3) }
          break;
        case "u":
          if( hulp == "H") {
            bl2 = "و"
		    ttvorm1 = k1 + l1 + "ُو" + l3
            ttvorm2 = k1 + l1 + "ُ" + l3 }
          else if( l1 == "و" && hulp == "" && vActive) {
            ttvorm1 = ttvorm2 = ttvorm = k1 + l2 + "ُ" + l3 }
          else if( l1 == "و" && hulp == "") { // geassimileerd werkwoord?
            ttvorm1 = ttvorm2 = ttvorm = k1 + l1 + "ْ" + l2 + "َ" + l3 }
          else if( l2 == l3) {
            ttvorm1 = k1 + l1 + "ُ" + l2 + "ّ"
            ttvorm2 = k1 + l1 + "ْ" + l2 + "ُ" + l2 }
          else {
            ttvorm = k1 + l1 + "ْ" + l2 + "ُ" + (l3 == "أ" ? "ؤ" : l3) }
          break;
      }
    }
  } 
  else if( control.length == 4 ) { // 4 letters
    l1 = control.slice(0,1)
    l2 = control.slice(1,2)
    l3 = control.slice(2,3)
    l4 = control.slice(3,4)
    ll =  l4
    if( l3 == "ّ" ) { //stam 2, 3 letter shedda
      stam += "II"
	  bl1 = l1
	  bl2 = l2
	  bl3 = (l4 == "ى" ? "ي" : l4)
      stamv = 2
	  if( l1 == "ي" || l1 == "و" ) {
	    stam += "(a)" }
	  if( l2 == "و" || l2 == "ي" ) {
	    stam += "(h)" }
	  if( l2 == l4 ) {
	    stam += "(g)" }
      if( l1 == "أ" ) {  //is dit nodig zou normaal I met tilde zijn
        ttavorm = "ُؤَ" + l2 + "َّ" + l4
        ttivorm = "ُؤَ" + l2 + "ِّ" + l4 }
      else {
        ttavorm = "ُ" + l1 + "َ" + l2 + "َّ" + l4
        ttivorm = "ُ" + l1 + "َ" + (l2 == "أ" ? "ئ" : l2) + "ِّ" + (l4 == "أ" ? "ئ" : (l4 == "ى" ? "ي" : l4)) }
      if(vActive) {
		ttvorm = ttivorm
        vtvorm = l1 + "َ" + l2 + "َّ" + l4 }
	  else {
		ttvorm = ttavorm
        vtvorm = l1 + "ُ" + l2 + "ِّ" + (l4 == "أ" ? "ئ" : (l4 == "ى" ? "ي" : l4)) }
	  if (ll == "ى" || ll == "أ" ) {
	    MasDar = "التَ" + l1 + "ْ" + l2 + "ِ" + (ll == "أ" ? "ئ" : "ي") + "ة" }
	  else {
	    MasDar = "التَ" + l1 + "ْ" + l2 + "ِي" +  l4 }
    } 
	else if( l2 == "ا" ) { //stam 3, 2e letter alif
      stam += "III"
      stamv = 3
	  bl1 = l1
	  bl2 = (l3 == "ء" ? "أ" : l3)
	  bl3 = (l4 == "ى" ? "ي" : l4)
	  if( l1 == "و" ) {
	    stam += "(a)" }
	  if( l3 == "و" ) {
	    stam += "(h)" }
      if( l4 == "ّ") {
        hulp = "S"
        stam += "(g)"
        vtvorm1 = l1 + (vActive ? l2 : "ُو")  + l3 + l4
        vtvorm = vtvorm1
        vtvorm2 = l1 + (vActive ? l2 : "ُو") + l3 + (vActive ? "َ" : "ِ") + l3
        ttavorm = "ُ" + (l1 == "ل" ? "لا" : l1 + "َا" ) + l3 + l4
        ttivorm = "ُ" + (l1 == "ل" ? "لا" : l1 + "َا" ) + l3 + l4
        ttvorm1 = ttivorm
        ttvorm2 = "ُ" + (l1 == "ل" ? "لا" : l1 + "َا" ) + l3 + "َ" + l4 }
      else {
        vtvorm = l1 + (vActive ? l2 : "ُو") + l3 + (vActive ? "َ" : "ِ") + (l4 == "أ" ? "ئ" : l4 )
        ttavorm = "ُ" + (l1 == "ل" ? "لا" : l1 + "َا" ) + l3 + "َ" + l4
        ttivorm = "ُ" + (l1 == "ل" ? "لا" : l1 + "َا" ) + (l3 == "ء" ? "ئ" : l3) + "ِ" + (l4 == "أ" ? "ئ" : l4 )
        ttvorm = ttivorm }
      if(vActive) {
		ttvorm = ttivorm }
	  else {
		ttvorm = ttavorm }
      MasDar = "المُ" + (l1 == "ل" ? "لا" : l1 + "َا" ) + l3 + "َ" +  (l4 == "ى" ? "ا" : l4) + "ة" }
    else if( l1 == "أ" ) {
      stam += "IV"
      stamv = 4
	  bl1 = l2
	  bl2 = (l3 == "ا" ? "ي" : l3)
	  bl3 = (l4 == "ى" ? "ي" : l4)
      MasDar =  "الإِ" + l2 + "ْ" + (l3 == "ل" ? "لا" : l3 + "َا" ) + (l4 == "أ" ? "ء" : l4)
	  if (l2 == "و") {
		  stam += "(a)"
	  }
      if( l3 == "ا" ) { // hol werkwoord
        hulp = "H"
        stam += "(h)"
        vtvorm = l1 + (vActive ? "َ" : "ُ" ) + (vActive ? (l2 == "ل" ? "لا" : l2 + "َا" ) : l2 + "ِي" )+ l4
        vtvorm1 = vtvorm
        vtvorm2 = l1 + (vActive ? "َ" : "ُ" ) + l2 + (vActive ? "َ" : "ِ") + (l4 == "ء" ? (vActive ? "أ" : "ئ"): l4)
        ttavorm = "ُ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4
        ttivorm = "ُ" + l2 + "ِي" + l4
        ttvorm = (vActive? ttivorm : ttavorm)
        ttvorm1 = ttvorm
        ttvorm2 = "ُ" + l2 + (vActive ? "ِ" : "َ") + l4
        MasDar =  "الإِ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4 + "َة" }
      else if( l2 == "ي" ) {
        stam += "(a)"
	    vtvorm = l1 + "َ" + l2 + "ْ" + l3 + "َ" + l4
        ttavorm = "ُوْ" + l3 + "َ" + l4
        ttivorm = "ُوْ" + l3 + "ِ" + l4
        ttvorm = (vActive? ttivorm : ttavorm) }
      else if( l2 == "و" ) {
        vtvorm = l1 + "َ" + l2 + "ْ" + l3 + "َ" + l4
        ttavorm = "ُ" + l2 + "ْ" + l3 + "َ" + l4
        ttivorm = "ُ" + l2 + "ْ" + l3 + "ِ" + l4
        ttvorm = (vActive? ttivorm : ttavorm)
        MasDar =  "الإِيْ" + (l3 == "ل" ? "لا" : l3 + "َا" ) + l4 }
      else if( l4 == "ّ") { //3e letter verdubbeld
        hulp = "S"
	    bl3 = l2
        stam += "(g)"
        vtvorm = l1 + (vActive ? "َ" : "ُ" ) + l2 + "ْ" + l3 + l4
        vtvorm1 = vtvorm
        vtvorm2 = l1 + (vActive ? "َ" : "ُ" ) + l2 + "ْ" + l3 + (vActive ? "َ" : "ِ") + l3
        ttavorm = "ُ" + l2 + "َ" + l3 + l4
        ttivorm = "ُ" + l2 + "ِ" + l3 + l4
        ttvorm1 = (vActive ? ttivorm : ttavorm )
        ttvorm2 = "ُ" + l2 + "ْ" + l3 + (vActive ? "ِ" : "َ") + l3
        MasDar =  "الإِ" + l2 + "ْ" + (l3 == "ل" ? "لا" : l3 + "َا" ) + l3 }
	  else {
        vtvorm = l1 + (vActive ? "َ" : "ُ" ) + l2 + "ْ" + l3 + (vActive ? "َ" : "ِ") + l4
        ttavorm = "ُ" + l2 + "ْ" + l3 + "َ" + l4
        ttivorm = "ُ" + l2 + "ْ" + (l3 == "أ" ? "ئ" : l3) + "ِ" + (l4 == "أ" ? "ئ" : l4)
        ttvorm = (vActive? ttivorm : ttavorm) }
//      if(vActive) {
//		ttvorm = ttivorm }
//	  else {
//		ttvorm = ttavorm }
    } 
	else if (l1 == "ت" && l2 == "آ") {
	  stam +="VI"
      stamv = 6
	  bl1 = "أ"
	  bl2 = l3
	  bl3 = (l4 == "ى" ? "ي" : l4)
      MasDar =  "التَآ" + l3 + "ُ" + l4
      vtvorm = l1 + "َ" + l2 + l3 + "َ" + l4
      ttavorm = "َ" + l1 + "َ" + l2 + l3 + "َ" + l4
      ttivorm = "َ" + l1 + "َ" + l2 + l3 + "ِ" + l4
      ttvorm = ttavorm }
	else {
      stam +="QI"
	  bl1 = l1
	  bl2 = l2
	  bl3 = l3
	  bl4 = (l4 == "ى" ? "ي" : l4)
      stamv = 21
      vtvorm = l1 + "َ" + l2 + "ْ" + l3 + "َ" + l4
      if ( l3 == "أ" ) {
	    ttivorm = "ُ" + l1 + "َ" + l2 + "ْيِ" + l4 }
	  else {
	    ttivorm = "ُ" + l1 + "َ" + l2 + "ْ" + l3 + "ِ" + l4 }
      ttavorm = "ُ" + l1 + "َ" + l2 + "ْ" + l3 + "َ" + l4
	  switch( TH ) {
	    case "a":
          ttvorm =  ttavorm
		  break
		case "i":
		  ttvorm =  ttivorm
          break
		case "u":
		  ttvorm =  "ُ" + l1 + "َ" + l2 + "ْؤ" + l4 }
	  if (Mcode == "") {
	    MasDar =  "ال" + l1 + "َ" + l2 + "ْ" + l3 + "ِ" + l4 + "ة" }
	  else {
	    MasDar =  "ال" + l1 + "ُ" + l2 + "ْ" + l3 + "َا" + l4 }
    } }
  else if( control.length == 5) { // 5 letters
    l1 = control.slice(0,1)
    l2 = control.slice(1,2)
    l3 = control.slice(2,3)
    l4 = control.slice(3,4)
    l5 = control.slice(4,5)
	var stam8 = "تّ.ثّ.دّ.طّ.ظّ.صط.ضط.زد"
    ll =  l5
    if( l1 == "ت" ) {
      if( l3 == "ا" ) {
        stam += "VI" 
        stamv = 6
		bl1 = l2
		bl2 = (l4 == "ء" ? "أ" : l4)
		bl3 = (l5 == "ى" ? "ي" : l5)
        MasDar =  "التَ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4 + (l5 == "ى" ? "ِي" :"ُ" + l5)
		if(l2 == "و") {
			stam += "(a)"
		}
        if( l5 == "ّ" ) {
          hulp = "S"
          stam += "(g)"
		  bl3 = l4
          MasDar =  "التَ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4 + "ُ" + l4
          vtvorm1 = l1 + (vActive ? "َ" : "ٌ") + l2 + (vActive ? l3 : "و") + l4 + l5
          vtvorm2 = l1 + (vActive ? "َ" : "ُ") + l2 + (vActive ? l3 : "و") + l4 + (vActive ? "َ" : "ِ") + l4
          vtvorm =  vtvorm1
          ttavorm = (vActive ? "َ" : "ٌ") + l1 + "َ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4 + l5
          ttivorm = ttavorm // (vActive ? "َ" : "ٌ") + l1 + "ِ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4 + l5
          ttvorm1 = ttavorm
          ttvorm2 = (vActive ? "َ" : "ٌ") + l1 + "َ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4 + "َ" + l4 }
        else {
		  stam += (l4 == "و" ? "(h)":"")
          vtvorm = l1 + (vActive ? "َ" : "ُ") + l2 + (vActive ? l3 : "ُو") + (vActive ? l4 + "َ" : (l4 ==  "ء" ? "ئِ" : "ِ")) + l5
          ttavorm = (vActive ? "َ" : "ُ") + l1 + "َ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + l4 + "َ" + l5
          ttivorm = (vActive ? "َ" : "ُ") + l1 + "َ" + (l2 == "ل" ? "لا" : l2 + "َا" ) + (l4 == "ء" || l4 == "أ" ? "ئ" : l4) + "ِ" + (l5 == "أ" ? "ئ" : l5)
		  ttvorm = ttavorm } }
      else if( l4 == "ّ" ) {
        stam += "V"
        stamv = 5
		bl1 = l2 
		bl2 = l3
		bl3 = (l5 == "ى" ? "ي" : (l5 == "أ" && l3 == "ي" ? "ء" : l5))
        MasDar =  "التَ" + l2 + "َ" + l3 + "ّ" + (l5 == "ى" ? "ِي" :"ُ" + l5)
		if( l3 == l5 ) {
		  stam += "(g)" }
		if( l2 == "و" || l2 == "ي" ) {
		  stam += "(a)" }
		if( l3 == "و" || l3 == "ي" ) {
		  stam += "(h)" }
		if( l5 == "أ" ) {
		  MasDar =  "التَ" + l2 + "َ" + l3 + "ُّؤ" }
        ttavorm = (vActive ? "َ" : "ُ") + l1 + "َ" + l2 + "َ" + l3 + "َّ" + l5
        ttivorm = (vActive ? "َ" : "ُ") + l1 + "َ" + l2 + "َ" + l3 + "ِّ" + (l5 == "أ" ? "ئ" : l5)
		vtvorm = l1 + "ُ" + l2 + (vActive ? "َ" : "ُ") + l3 + "ّ" + (vActive ? "َ" : "ِ") + l5
        ttvorm = ttavorm }
	  else {
        stam += "QII"
        stamv = 22
		bl1 = l2
		bl2 = l3
		bl3 = l4
		bl4 = (l5 == "ى" ? "ي" : l5)
        MasDar =  "التَ" + l2 + "َ" + l3 + "ْ" + l4 + "ُ" + l5
        vtvorm = "تَ" + l2 + "َ" + l3 + "ْ" + l4 + "َ" + l5
        ttavorm = "َتَ" + l2 + "َ" + l3 + "ْ" + l4 + "َ" + l5
        ttivorm = "َتَ" + l2 + "َ" + l3 + "ْ" + l4 + "ِ" + l5
        ttvorm = ttavorm } }
    else if( l2 == "ن" && l3 != "ت") {
      stam += "VII"  //stam 7 kent geen passieve vorm
      stamv = 7 
	  bl1 = l3
	  bl2 = l4
	  bl3 = (l5 == "ى" ? "ي" : l5)
      MasDar =  "الاِنْ" + l3 + "ِ" + (l4 == "ل" ? "لا" : (l4 == "ا" || l4 == "و" ? "يا" : l4 + "َا" )) + l5
      if( l5 == "ّ" ) {
        hulp = "S"
        stam += "(g)"
		bl3 = l4
        MasDar =  "الاِنْ" + l3 + "ِ" + (l4 == "ل" ? "لا" : l4 + "َا" ) + l4
        vtvorm1 = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + l4 + l5
        vtvorm2 = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + l4 + "َ" + l4
        vtvorm = vtvorm1
        ttavorm = "َنْ" + l3 + "َ" + l4 + l5
        ttivorm = "َنْ" + l3 + "ِ" + l4 + l5
        ttvorm1 = ttivorm
        ttvorm2 = "َنْ" + l3 + "َ" + l4 + "ِ" + l4 }
      else if( l4 == "ا" ) {
        hulp = "H"
        stam += "(h)"
        MasDar =  "الانْ" + l3 + "ِيا" + l5
        vtvorm1 = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + l4 + l5
        vtvorm2 = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + l5
        vtvorm = vtvorm1
        ttavorm = "َنْ" + l3 + "َا" + l5
        ttivorm = ttavorm // "َنْ" + l3 + "ِي" + l5 (holle werkwoorden altijd met ا)
        ttvorm1 = ttavorm
        ttvorm2 = "َنْ" + l3 + "َ" + l5 }
	  else {
        vtvorm = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + l4 + "َ" + l5
        ttavorm = "َنْ" + l3 + "َ" + l4 + "َ" + l5
        ttivorm = "َنْ" + l3 + "َ" + l4 + "ِ" + l5
        ttvorm = ttivorm } }
    else if( l5 == "ّ" && stam8.indexOf(l2+l3) < 0 && l3 != "ت") {
      stam += "IX"  // stam 9 is nooit passief
      stamv = 9
	  bl1 = l2 
	  bl2 = l3
	  bl3 = (l4 == "ى" ? "ي" : l4)
      MasDar =  "الاِ" + l2 + "ْ" + l3 + "ِ" + (l4 == "ل" ? "لا" : l4 + "َا" ) + l4
      vtvorm1 = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + l4 + l5
      vtvorm2 = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + l4 + "َ" + l4
      vtvorm = vtvorm1
      hulp = "S"
      ttavorm = "َ" + l2 + "ْ" + l3 + "َ" + l4 + "ّ"
      ttivorm = "َ" + l2 + "ْ" + l3 + "ِ" + l4 + "ّ"
      ttvorm1 = ttavorm
      ttvorm2 = "َ" + l2 + "ْ" + l3 + "َ" + l4 + "ِ" + l4 }
    else if (l4 == "آ") {
      stam += "X(h)" //verder te controleren
      stamv = 10
      l6 = l5
      l4 = "أ"
      l5 = "و"
      ll =  l6
	  bl1 = l4
	  bl2 = (l5 == "ا" ? "ي" : l5)
	  bl3 = (l6 == "ى" ? "ي" : l6)
      MasDar =  "الاِسْتِ" + l4 + "ْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l6
	  MasDar =  "الاِسْتِئْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l6
	  vtvorm = l1 + "ِ" + l2 + "ْ"+ l3 + "َ" + "آ" + "َ" + l6
      ttavorm = "َسْتَ" + "آ" + "َ" + l6
      ttivorm = "َسْتَ" + "ئ" + "ْ" + "ي" + "ِ" + l6
      ttvorm = ttivorm }
	else {
      stam += "VIII"
      stamv = 8
	  bl1 = l2 
	  bl2 = (l4 == "ا" ? "ي" : l4)
	  bl3 = (l5 == "ى" ? "ي" : l5)
      if (l5 == "أ") {
	    MasDar = "الاِ" + l2 + "ْ" +  l3 + "ِ" + (l4 == "ل" ? "لآ" : l4 + "َآ" ) }
	  else {
        MasDar = "الاِ" + l2 + "ْ" +  l3 + "ِ" + (l4 == "ل" ? "لا" : l4 + "َا" ) + l5 }
      if( l3 == "ّ") {
        bl1 = "و"
	    vtvormx = l1 + "ِ" + l2 + "َّ"
	    ttvormx = (vActive ? "َ" : "ُ") + (l2 == "ئ" ? "أ" : l2) + "ّ"
		if (l5 == "أ") {
		  MasDar =  "الاِ" + l2 + "ِّ" + (l4 == "ل" ? "لآ" : l4 + "َآ" ) }
		else {
		  MasDar =  "الاِ" + l2 + "ِّ" + (l4 == "ل" ? "لا" : l4 + "َا" ) + l5 } }
      else {
        vtvormx = l1 + (vActive ? "ِ" : "ُ") + l2 + "ْ"+ l3 + (vActive ? "َ" : "ُ")
	    ttvormx = (vActive ? "َ" : "ُ") + (l2 == "ئ" ? "أ" : l2) + "ْ" + l3 }
	  if (l4 == "و" ) {
		  stam += "(h)"
	  }
      if( l4 == "ا" )
      { hulp = "H"
        stam += "(h)"
        MasDar = "الاِ" + l2 + "ْ" +  l3 + "ِيَا" + l5
        vtvorm = (vActive ? vtvormx + "ا" : vtvormx.slice(0,5) + "ِي") + l5
        vtvorm1 = vtvorm
        vtvorm2 = (vActive ? vtvormx : vtvormx.slice(0,5) + "ِ") + l5
        ttavorm = ttvormx + "َا" + l5
        ttivorm = ttavorm // ttvormx + "ِي" + l5 (zowel passief als actief gebruiken ا
        ttvorm = ttavorm
        ttvorm1 = ttvorm
        ttvorm2 = ttvormx + "َ" + l5
      } else if (l5 == "ّ") 
      { hulp = "S"
	    bl3 = l4
        stam += "(g)"
        MasDar = "الاِ" + l2 + "ْ" +  l3 + "ِ" + (l4 == "ل" ? "لا" : l4 + "َا" ) + l4
        vtvorm1 = vtvormx + l4 + l5
		vtvorm = vtvorm1
        vtvorm2 = vtvormx + l4 + (vActive ? "َ" : "ِ" ) + l4
        ttavorm = ttvormx + "َ" + l4 + l5
        ttivorm = ttvormx + "ِ" + l4 + l5
        ttvorm1 = ( vActive ? ttivorm : ttavorm )
        ttvorm2 = ttvormx + "َ" + l4 + (vActive ? "ِ" : "َ") + l4
      } else if (l5 == "أ")
      { vtvorm = vtvormx + l4 + (vActive ? "َ" + l5 : "ِئ" )
        ttavorm = ttvormx + "َ" + l4 + "َأ"
        ttivorm = ttvormx + "َ" + l4 + "ِئ"
        ttvorm = ( vActive ? ttivorm : ttavorm )
	  } else
      { vtvorm = vtvormx + l4 + (vActive ? "َ" : "ِ" ) + l5
        ttavorm = ttvormx + "َ" + l4 + "َ" + l5
        ttivorm = ttvormx + "َ" + l4 + "ِ" + l5
        ttvorm = ( vActive ? ttivorm : ttavorm )
      }  
    }
  } else if( control.length == 6) // 6 letters
  { l1 = control.slice(0,1)
    l2 = control.slice(1,2)
    l3 = control.slice(2,3)
    l4 = control.slice(3,4)
    l5 = control.slice(4,5)
    l6 = control.slice(5,6)
    ll =  l6
    if (l2 == "س" && l3 == "ت")
    { stam += "X"
      stamv = 10
	  bl1 = l4
	  bl2 = (l5 == "ا" ? "ي" : l5)
	  bl3 = (l6 == "ى" ? "ي" : l6)
      MasDar =  "الاِسْتِ" + l4 + "ْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l6
	  if(l4 == "و") {
		  stam += "(a)"
	  }
      if(l6 == "ّ")
      { hulp = "S"
        stam += "(g)"
		bl3 = l5
        MasDar =  "الاِسْتِ" + l4 + "ْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l5
        vtvorm1 = l1 + (vActive ? "ِ" : "ُ") + l2 + "ْ"+ l3 + "َ" + l4 + (vActive ? "َ" : "ِ") + l5 + l6
        vtvorm2 = l1 + (vActive ? "ِ" : "ُ") + l2 + "ْ"+ l3 + "َ" + l4 + "ْ" + l5 + (vActive ? "َ" : "ِ") + l5
        vtvorm = vtvorm1
        ttavorm = (vActive ? "َ" : "ُ") + "سْتَ" + l4 +  "َ" + l5 + "ّ"
        ttivorm = (vActive ? "َ" : "ُ") + "سْتَ" + l4 +  "ِ" + l5 + "ّ"
        ttvorm1 = (vActive ? ttivorm : ttavorm)
        ttvorm2 = (vActive ? "َ" : "ُ") + "سْتَ" + l4 +  "ْ" + l5 + (vActive ? "ِ" : "َ") + l5
      } else if( l5 == "ا")
      { hulp = "H"
        stam = stam.concat("(h)")
        MasDar =  "الاِسْتِ" + (l4 == "ل" ? "لا" : l4 + "َا" ) + l6 + "َة"
        vtvorm = l1 + (vActive ? "ِ" : "ُ") + l2 + "ْ"+ l3 + "َ" + (vActive ? (l4 == "ل" ? "لا" : l4 + "َا" ) : l4 + "ِي") + l6
        vtvorm1 = vtvorm
        vtvorm2 = l1 + (vActive ? "ِ" : "ُ") + l2 + "ْ"+ l3 + "َ" + l4 + (vActive ? "َ" : "ِ") + l6
        ttavorm = (vActive ? "َ" : "ُ") + "سْتَ" + (l4 == "ل" ? "لا" : l4 + "َا" ) + l6
        ttivorm = (vActive ? "َ" : "ُ") + "سْتَ" + l4 +  "ِي" + l6
        ttvorm1 = (vActive ? ttivorm : ttavorm)
        ttvorm2 = (vActive ? "َ" : "ُ") + "سْتَ" + l4 +  (vActive ? "ِ" : "َ") + l6
      } else
      { if( l4 == "أ" ) {
	      MasDar =  "الاِسْتِئْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l6 }
		vtvorm = l1 + (vActive ? "ِ" : "ُ") + l2 + "ْ"+ l3 + "َ" + l4 + "ْ" + (vActive ? l5 + "َ" + l6: (l5 == "أ" ? "ئ" : l5) + "ِ" + (l6 == "ى" ? "ي" : l6))
        ttavorm = (vActive ? "َ" : "ُ") + "سْتَ" + l4 + "ْ" + l5 + "َ" + l6
        ttivorm = (vActive ? "َ" : "ُ") + "سْتَ" + l4 + "ْ" + (l5 == "أ" ? "ئ" : l5) + "ِ" + l6
      }
	  ttvorm = (vActive ? ttivorm : ttavorm )
    } else if( l4 == "ا" && l6 == "ّ")
    { stam += "XI"
      stamv = 11
      MasDar =  "الاِ" + l2 + "ْ" + l3 + "َي" + l5 + "ا" + l5
      vtvorm = "اِ" + l2 + "ْ" + (l3 == "ل" ? "لا" : l3 + "َا" ) + l5 + "ّ"
      ttvorm = "َ" + l2 + "ْ" + (l3 == "ل" ? "لا" : l3 + "َا" ) + l5 + "ّ"
    } else if( l3 == l5 && l4 == "و")
    { stam += "XII"
      stamv = 12
      MasDar =  "الاِ" + l2 + "ْ" + l3 + "ي" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l6
      vtvorm = "اِ" + l2 + "ْ" + l3 + "َوْ" + l5 + "َ" + l6
      ttavorm = "َ" + l2 + "ْ" + l3 + "َوْ" + l5 + "َ" + l6
      ttivorm = "َ" + l2 + "ْ" + l3 + "َوْ" + l5 + "ِ" + l6
      ttvorm = ttivorm
    } else if( l4 == "و" && l5 == "ّ")
    { stam += "XIII"
      stamv = 13
      MasDar =  "الاِ" + l2 + "ِ" + l3 + "وّا" + l6
      vtvorm = "اِ" + l2 + "ْ" + l3 + "َوَّ" + l6
      ttavorm = "َ" + l2 + "ْ" + l3 + "َوَّ" + l6
      ttivorm = "َ" + l2 + "ْ" + l3 + "َوِّ" + l6
      ttvorm = ttivorm
    } else if( l4 == "ن" && l5 == l6)
    { stam += "XIV"
      stamv = 14
      MasDar =  "الاِ" + l2 + "ْ" + l3 + "ِنْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l6
      vtvorm = "اِ" + l2 + "ْ" + l3 + "َنْ" + l5 + "َ" + l6
      ttavorm = "َ" + l2 + "ْ" + l3 + "َنْ" + l5 + "َ" + l6
      ttivorm = "َ" + l2 + "ْ" + l3 + "َنْ" + l5 + "ِ" + l6
      ttvorm = ttivorm
    } else if( l4 == "ن" && l6 == "ى")
    { stam += "XV"
      stamv = 15
      MasDar =  "الاِ" + l2 + "ْ" + l3 + "ِنْ" + l5 + "اء"
      vtvorm = "اِ" + l2 + "ْ" + l3 + "َنْ" + l5 + "َى" 
      ttavorm = "َ" + l2 + "ْ" + l3 + "َنْ" + l5 + "َى" 
      ttivorm = "َ" + l2 + "ْ" + l3 + "َنْ" + l5 + "ِي" 
      ttvorm =  ttivorm
    } else if( l4 == "ن")
    { stam += "QIII"
      stamv = 23
      MasDar =  "الاِ" + l2 + "ْ" + l3 + "ِنْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l6
      vtvorm = "اِ" + l2 + "ْ" + l3 + "َنْ" + l5 + "َ" + l6
      ttavorm = "َ" + l2 + "ْ" + l3 + "َنْ" + l5 + "َ" + l6
      ttivorm = "َ" + l2 + "ْ" + l3 + "َنْ" + l5 + "ِ" + l6
      ttvorm = ttivorm
    } else if( l6 == "ّ")
    { stam += "QIV"
      hulp =  "S"
      stamv = 24
	  bl1 = l2
	  bl2 = l3
	  bl3 = l4
	  bl4 = l5
      MasDar =  "الاِ" + l2 + "ْ" + l3 + "ِ" + l4 + "ْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l5
      vtvorm1 = "اِ" + l2 + "ْ" + l3 + "َ" + l4 + "َ" + l5 + "ّ"
      vtvorm2 = "اِ" + l2 + "ْ" + l3 + "َ" + l4 + "ْ" + l5 + "َ" + l5
      vtvorm = vtvorm1
      ttavorm = "َ" + l2 + "ْ" + l3 + "َ" + l4 + "َ" + l5 + "ّ"
      if( l4 == "أ" ) 
      { ttivorm = "َ" + l2 + "ْ" + l3 + "َئِ" + l5 + "ّ"
        MasDar =  "الاِ" + l2 + "ْ" + l3 + "ِئْ" + (l5 == "ل" ? "لا" : l5 + "َا" ) + l5
      } else
      { ttivorm = "َ" + l2 + "ْ" + l3 + "َ" + l4 + "ِ" + l5 + "ّ"
      }
      ttvorm1 = ttivorm
      ttvorm2 = "َ" + l2 + "ْ" + l3 + "َ" + l4 + "ْ" + l5 + "ِ" + l5
    }
  } else
  { stam += "??"
    stamv = 0
  }

    // Aanpassingen gebrekkige werkwoorden
tll = (!vActive ? (((ll == "ى") || (ll == "ا")) && !(stamv == 1 && l2 == "أ") ? "ي" : (ll == "ي" ? "ى" : ll)) : ll )
  switch( tll )
  { case "ا": //B1 - gebrekkig eindigend op ا
      hulp = "B1"
      stam += "(b)"
      vtvorm1 = vtvorm.slice(0,vtvorm.length-2)
      vtvorm2 = vtvorm1 + "و"
      ttvorm2 = ttvorm.slice(0,ttvorm.length-2)
      ttvorm1 = ttvorm2 + "ُو" 
      break;
    case "ي": //B2 - gebrekkig eindigend op ي
      hulp = "B2"
      stam += "(b)"
	  console.log(ttvorm + " --- " + vtvorm)
      vtvorm1 = vtvorm.slice(0,vtvorm.length-2)
      vtvorm2 = vtvorm.slice(0,vtvorm.length-1) + "ي"
	  if (TH == "a") {
        ttvorm2 = ttvorm.slice(0,ttvorm.length-2) + "َ"
        ttvorm1 = ttvorm2 + "ى" }
	  else {
        ttvorm2 = ttvorm.slice(0,ttvorm.length-2)
        ttvorm1 = ttvorm2 + "ِي"
		hulp = "B6"}	  
	  console.log(vtvorm1 + " " + vtvorm2)
	  if( stamv != 1 ) {
	    if ( MasDar.slice(MasDar.length-2,MasDar.length-1) != "ا") {
	      MasDar = MasDar.slice(0,MasDar.length-1)+ "اء" }
	    else {
	      MasDar = MasDar.slice(0,MasDar.length-1)+ "ء" } }
      break;
    case "ى": //B3 - eindigend op ى , B4 = stam V en stam I combinaties met أ
      hulp = "B3"
      stam += "(b)"
	  //if( vActive ) {
      vtvorm1 = vtvorm.slice(0,vtvorm.length-2) // +  "ِ"
      vtvorm2 = vtvorm1 + "َي"
      if( stamv == 1 && l2 == "أ") {
        ttvorm2 = ttvorm.slice(0,ttvorm.length-4) + "َ"
        ttvorm1 = ttvorm2 + "ى"
        TH = ""		
        hulp = "B4" } 
      else if( stamv == 5 || stamv == 6) {
        ttvorm2 = ttvorm.slice(0,ttvorm.length-2)  + "َ"
        ttvorm1 = ttvorm2 + "ى" 
        hulp = "B4" }
      else {
        ttvorm2 = ttvorm.slice(0,ttvorm.length-2)
        ttvorm1 = ttvorm2 + "ِي" } //}
	  if ( stamv != 3 && stamv != 6 && stamv != 2 && stamv != 1 && stamv != 5) {
	    if ( MasDar.slice(MasDar.length-1,MasDar.length) == "ي" ||
	         MasDar.slice(MasDar.length-1,MasDar.length) == "ى" ) {
	      if ( MasDar.slice(MasDar.length-2,MasDar.length-1) == "ا") {
		    MasDar = MasDar.slice(0,MasDar.length-1) + "ء" }
		  else {
		    MasDar = MasDar.slice(0,MasDar.length-1)+ "اء" } } }
      break;  
  }

  console.log(hulp)
  
  // break down passed down stam
  if (bls != "" ) {
    bl1 = bls.slice(0,1)
	bl2 = bls.slice(1,2)
	bl3 = bls.slice(2,3)
	bl4 = (bls.length > 3 ? bls.slice(3,4) : "") }

  //show masDar stam I en higher (up to XV)
  j = 0
  if( stamv > 1 && stamv < 20) {
    $("#VMT").removeClass("ui-screen-hidden")
    $("#VM1").removeClass("ui-screen-hidden")
	$("#M1").html(MasDar) 
	j = 1}   

  //set masDar for form I - XIV
  if( (Mcode.length > 0) && ( stamv < 20 ) )
  { if( Mcode.slice(1,2) == "," ) {
      Mcount = Number(Mcode.slice(0,1)) + j
	  Minit = 2 }
    else {
      Mcount = 1 + j
	  Minit = 0 } 
    $("#VMT").removeClass("ui-screen-hidden")
//aanpassen zwakke werkwoorden // nakijken of nog steeds nodig
//	if( l2 == "ا" )
//	{ bl2 = (TH == "i" ? "ي" : "و" )
//	}
    while ( j < Mcount ) {
      MasDar =  "ال"
      //eerste verbinding
	  suffix = ""
	  if( Mcode.slice(Minit + 0, Minit + 1) == "*") {
	    suffix = "<sup>*</sup>"
	    Minit += 1 }

	  switch( Mcode.slice(Minit + 0,Minit + 1) )
	  { case "0": //l1 + a + l2
	      switch( bl2 )
		  { case "ئ" :
  			  MasDar += bl1 + "َأ"
		      break;
		    default:
  			  MasDar += bl1 + "َ" + bl2
		  }
	      break;
	    case "1": //l1 + i + l2
	      switch( bl2 )
		  { case "ا" :
  			case "و" :
  			  MasDar += bl1 + "ِي"
		      break;
			case "أ":
  			  MasDar += bl1 + "ِئ"
			  break
		    default:
			  if( l1 == "أ" )
			  { MasDar += "إِ" + bl2
			  } else
			  { MasDar += bl1 + "ِ" + ( bl2 == "و" && hulp == "H" ? "ي" : bl2)  //only change when hollow verb
			  }
		  }
	      break;
		case "2": //l1 + u + l2
	      switch( bl2 )
		  { case "ا" :
  			  MasDar += bl1 + "ُو"
		      break;
			case "أ":
			case "ئ":
  			  MasDar += bl1 + "ُؤ"
			  break
		    default:
  			  MasDar += bl1 + "ُ" + bl2
		  }
	      break;
		case "3": //ma + l1 + o + l2
     	  MasDar += "مَ" + bl1 + "ْ" + bl2
	      break;
		case "4": //ma + l1 + a + l2
     	  MasDar += "مَ" + bl1 + "َ" + ( bl2 == "و" || bl2 == "ي" ? "ا" : bl2)
	      break;
		case "5": //ma + l1 + i + l2
     	  MasDar += "مَ" + bl1 + "ِ" + ( bl2 == "و" ? "ي" : bl2)
	      break;
		case "6": //ma + l1 + u + l2
     	  MasDar += "مَ" + bl1 + "ُ" + bl2
	      break;
		case "7": //ta + l1 + o + l2
     	  MasDar += "تَ" + bl1 + "ْ" + bl2
	      break;
		case "8": //ta + l1 + a + l2
     	  MasDar += "تَ" + bl1 + "َ" + ( bl2 == "و" || bl2 == "ي" ? "ا" : bl2)
	      break;
		case "9": //ta + l1 + i + l2
     	  MasDar += "تَ" + bl1 + "ِ" + ( bl2 == "و" ? "ي" : bl2)
		  break;
		case "A": //ta + l1 + u + l2
     	  MasDar += "تَ" + bl1 + "ُ" + bl2
	  }
	  //tweede verbinding
	  at = ""
	  switch( Mcode.slice(Minit + 1,Minit + 2) )
	  { case "0": //M + a + l3 + at
	      at = "ة"
	    case "1": //M + a + l3
		  MasDar += "َ" + bl3 + at
	      break;
		case "2": //M + i + l3 + at
	      at = "ة"
		case "3": //M + i + l3
		  MasDar += "ِ" + (bl3 == "ؤ" || bl3 == "أ" ? "ئ" : bl3) + at
	      break;
		case "4": //M + u + l3 + at
	      at = "ة"
		case "5": //M + u + l3
		  MasDar += "ُ" + bl3 + at
	      break;
		case "6": //M + aA + l3 + at
	      at = "ة"
		case "7": //M + aA + l3
		  if( bl3 == "أ" || bl3 == "ئ")
		  { MasDar += "اء" + at
		  } else
		  { MasDar += "ا" + bl3 + at
		  }
	      break;
		case "8": //M + uU + l3 + at
	      at = "ة"
		case "9": //M + uU + l3
		  MasDar += "ُو" + (bl3 == "و" ? "ّ" : (bl3 == "أ" ? "ء" : bl3 )) + at
	      break;
		case "A": //M + o + l3 + at
	      at = "ة"
		case "B": //M + o + l3
		  if( bl2 == bl3 )
		  { MasDar += "ّ" + at
		  } else if( bl3 == "ي" && bl2 == "و")
		  { MasDar = MasDar.slice(0,MasDar.length-1) + "يّ" + at
		  } else if( bl3 == "أ" && at == "")
		  { MasDar += "ْء" + at
		  } else
		  { MasDar += "ْ" + bl3 + at
		  }
	      break;
		case "C": //M + o + l3 + aAn
		  MasDar += "ْ" + (bl3 == "ى" ? "ي" : bl3)  + "ان"
	      break;
		case "D": //M + a + l3 + aAn
		  MasDar += "َ" + (bl3 == "ى" ? "ي" : bl3)  + "ان"
	      break;
		case "E": //M + i + l3 + aAn
		  MasDar += "ِ" + (bl3 == "ى" ? "ي" : bl3)  + "ان"
	      break;
		case "F": //M + u + l3 + aAn
		  MasDar += "ُ" + (bl3 == "ى" ? "ي" : bl3)  + "ان"
	      break;
		case "G": //M + iI + l3 + at
	      at = "ة"
		case "H": //M + iI + l3
		  MasDar += "ِي" + (bl3 == "ي" ? "ّ" : bl3) + at
	      break;
		case "I": //M + aA + at, te checken
	      at = "ة"
		case "J": //M + aA + (' of at), te checken
		  MasDar += (bl2 == "ل" ? "ا" : "َا") + (at == "" ? "ء" : at)
	      break;
		case "K": //M + a
		  MasDar += "ى"
	      break;		  
		case "L": // M + l3 + a  (moet l3?)
		  MasDar += bl3 + "ى"
	      break;
		case "M": // M + o + l3 + A
		  MasDar += (bl2 == bl3 ? "ّ" : "ْ" + bl3) + "ا"
	      break;
		case "N": //M + aA'at
		  MasDar += (bl2 == "ل" ? "ا" : "َا") + "ءة"
	      break;
	  }
	  $("#M"+(j+1)).html(MasDar+suffix)
	  $("#VM"+(j+1)).removeClass("ui-screen-hidden")
	  j += 1
	  Minit += 3
	} 
  }

  while ( j < 5 ) {
    $("#VM"+(++j)).addClass("ui-screen-hidden") }

  hamzated = "ؤءئأ"
  $(".id-verb").html(vtvorm + 
     (tll == "ى" ? "" : "َ" ) + " - " +
     (hamzated.indexOf(bl1) > -1 ? "أ" : bl1) + 
	 (hamzated.indexOf(bl2) > -1 ? "أ" : bl2) + 
	 (hamzated.indexOf(bl3) > -1 ? "أ" : (bl3 == "*" ? "و" : bl3)) + 
	 ((hamzated.indexOf(bl4) > -1) && (bl4 != "") ? "أ" : bl4) + 
	 (bl3 == "*" ? "|" + 
	 (hamzated.indexOf(bl1) > -1 ? "أ" : bl1) + 
	 (hamzated.indexOf(bl2) > -1 ? "أ" : bl2) + 
	 (hamzated.indexOf(bl3) > -1 ? "أ" : (bl3 == "*" ? "ي" : bl3)) + 
	 ((hamzated.indexOf(bl4) > -1) && (bl4 != "") ? "أ" : bl4):""))	 ;
  $(".id-verb.ui-title-arab").html(vtvorm + (tll == "ى" ? "" : "َ" ))
	 
  $("#S").html(stam + "</sup>");
  $(".id-S").html(stam.slice(10,(stam.indexOf("(") > 0 ? stam.indexOf("(")  : stam.length)))
  if( vActive ) {
	  console.log(cls)
  // Hide passive participle if p mentioned
  var hidePassive = (ttavorm == "")
  $("#PPT").toggleClass("ui-screen-hidden", hidePassive )
  $("#PPV").toggleClass("ui-screen-hidden", hidePassive)
  // set active and passive participle
  if( stamv > 1 ) {
    if(ttivorm.slice(ttivorm.length-1,ttivorm.length) == "ى" ) {
//      rAD 	= "مُ" + ttivorm.slice(1,ttivorm.length-1) + "ي"}
      rAD 	= "مُ" + ttivorm.slice(1,ttivorm.length-2) + "ٍ"}
	else {
	  rAD = "مُ" + ttivorm.slice(1,ttivorm.length) }
    rPD = "مُ" + ttavorm.slice(1,ttavorm.length) + (cls != "" ? " " + cls + "ه" : "")}
  else {
    rAD = ttivorm
	rPD = ttavorm + (cls != "" ? " " + (cls.slice(cls.length-1,cls.length) == "ى" ? cls.slice(0,cls.length-1) + "ي": cls) + "هِ" : "")
  }
  $("#AD").html(rAD)
  $("#PD").html(rPD) 
  }
  if( hulp == "" ) { 
    vtvorm1 = vtvorm2 = vtvorm
    ttvorm1 = ttvorm2 = ttvorm }
	
  pvtvorm2 = vtvorm2
  pvtvorm1 = vtvorm1
  pttvorm1 = ttvorm1
  pttvorm2 = ttvorm2
  phulp = hulp
  pstamv = stamv 
  pthulp = TH
  
  //if function not called from full Display, go to tense selection page
 /* if( $.mobile.activePage && !fullDisp ) {
    $.mobile.navigate("",  { reverse:true }) }*/
//  else if( $.mobile.activePage && fullDisp ) { 
//    showLBTop() }
}

function updateTenseTable( ) {
  showTense(st1,1) 
  showTense(st2,2) 
  showTense(st3,3) 
  showTense(st4,4) 
  showTense(st5,5) 
  }

function updateSingleTense( ) {
  st = "C" + $("#ActPas").val() + $('input[name=checkC1]:checked').val() + ($("#checkN").prop('checked') ? "N" : "P")
  if ( st.slice(1,4) == "A1N" ) {
    st = st + $('input[name=radioN]:checked').val() 
    $(".col_2").toggleClass("ui-screen-hidden",false) }
  else {
    $(".col_2").toggleClass("ui-screen-hidden",true) }
  var update = true
  switch( sc ) {
    case 1 : (st1 == st ? update = false : st1 = st); break;
    case 2 : (st2 == st ? update = false : st2 = st); break;
    case 3 : (st3 == st ? update = false : st3 = st); break;
    case 4 : (st4 == st ? update = false : st4 = st); break;
    case 5 : (st5 == st ? update = false : st5 = st); }
  if( update ) { showTense(st,sc)}
}
   
  
function selectTense( c_code ) {
  logFunctionTime("selectTense start" + c_code)

  //calculate new hashes - for use with swipeleft/swiperight
  if( c_code.slice(0,1) != "#" ) 
  { c_prefix = prevHash.slice(0,3)
    n_tense = Number(prevHash.slice(3,4))
    switch( c_code )
    { case "+1": // Next Tense
        if( n_tense < 7 ) {
	      prevHash = c_prefix + (n_tense == 4 && prevHash.slice(2,3) == "P"? 7 : n_tense + 1) 
		  showTense(prevHash.slice(1,4),"") }
        break;
      case "-1": // Previous Tense
        if( n_tense > 1 ) {
	      prevHash = c_prefix + (n_tense == 7 && prevHash.slice(2,3) == "P" ? 4 : n_tense - 1) 
		  showTense(prevHash.slice(1,4),"") }
        break;
	  case "R": // Refresh (used for toggle Positive/Negative)
        showTense(prevHash.slice(1,4),"") 
	    break;
    }
  } else
  { // update #con page
    showTense(c_code.slice(1,4),"") 
    prevHash = c_code
  }
  //show AP toggle only when conjugated tense allows and when passive exists
  if( !$(".id-ap-sw1").hasClass("ui-screen-hidden" ) ) {
  console.log("toggle hidden")
  $(".id-ap-sw2").toggleClass("ui-screen-hidden",(Number(prevHash.slice(3,4)) > 4) && (Number(prevHash.slice(3,4)) != 7))
  $(".id-ap-st2").toggleClass("ui-screen-hidden",(Number(prevHash.slice(3,4)) < 5) || (Number(prevHash.slice(3,4)) == 7))  }
}

function showTense(tijd,column) {
  logFunctionTime("showTense-begin" + tijd)
  if( !fullDisp ) {
	  $(".col_2").toggleClass("ui-screen-hidden",!((tijd == "CA1") && $("#checkN").prop('checked')))
	  $(".id-cspy").addClass("ui-screen-hidden")
	  $("#conj-spy").html("")
	  $("#pers-spy").html("")
	  $(".scrTo").addClass("ui-screen-hidden")
	  if(tijd.slice(0,3) == "CA1" ) {
		  if( Voptions.length > 2) {
		    $(".scrTo3").removeClass("ui-screen-hidden").toggleClass("scrSelect",Vactive == Voptions.slice(2,3)).html(Voptions.slice(2,3)) }
		  if( Voptions.length > 1) {
		    $(".scrTo2").removeClass("ui-screen-hidden").toggleClass("scrSelect",Vactive == Voptions.slice(1,2)).html(Voptions.slice(1,2)) }
		  if( Voptions.length > 0) {
   		    $(".scrTo1").removeClass("ui-screen-hidden").toggleClass("scrSelect",Vactive == Voptions.slice(0,1)).html(Voptions.slice(0,1))
		  }
		  if( (Voptions.length == 0) && (Toptions.length > 0) ) {
		    $(".scrTo1").removeClass("ui-screen-hidden").addClass("scrSelect").html((Tactive == "u" ? "u" : "i"))
		  }
	  } else if(tijd.slice(0,3) == "CA2" ){
		  if( Toptions.length > 2) {
		    $(".scrTo3").removeClass("ui-screen-hidden").toggleClass("scrSelect",Tactive == Toptions.slice(2,3)).html(Toptions.slice(2,3)) }
		  if( Toptions.length > 1) {
		    $(".scrTo2").removeClass("ui-screen-hidden").toggleClass("scrSelect",Tactive == Toptions.slice(1,2)).html(Toptions.slice(1,2)) }
		  if( Toptions.length > 0) {
		    $(".scrTo1").removeClass("ui-screen-hidden").toggleClass("scrSelect",Tactive == Toptions.slice(0,1)).html(Toptions.slice(0,1)) }		  
	  } else {
		  console.log("test 3")
		  $(".scrTo").addClass("ui-screen-hidden")
	  }
	  
	  }
  
// dp1 en dp2 gebruikt voor waarde
// np - prefix voor negatief van werkwoord
  pplural = (tijd.slice(1,2) == "A" ? paplural : ppplural )
  var dp2 = "#V" + column
  var spec = "ui-bg-emph"
  var preHead = (fullDisp ? "" : "Tense: ")
  var postHead = (fullDisp ? '<span class="ui-li-count ui-body-inherit">'+(tijd.slice(1,2) == "A" ? "A" : "P") +"</span>":"")
  switch( tijd.slice(0,3) ) {
    case "CA1":
	  vActive = true
      t1 = pavtvorm2
	  t2 = pavtvorm1
      hulp = pahulp
	  break;
	case "CP1":
	  vActive = false
      t1 = ppvtvorm2
	  t2 = ppvtvorm1
      hulp = pphulp
	  break;
	case "CP2":
	case "CP3":
	case "CP4":
	case "CP7":
	  vActive = false
      t1 = ppttvorm1
	  t2 = ppttvorm2
      hulp = pphulp
	  break;
	default:
	  vActive = true
      t1 = pattvorm1
	  t2 = pattvorm2
      hulp = pahulp
	  break;
	}
  
  //Determine negative form or not
  if( !fullDisp ) {
    tijd = tijd.slice(0,3) + ( $("#checkN").prop('checked') ? "N" : "P") }
  
  
//  tijd = (tijd.slice(2,4) == "1N" ? tijd + $('input[name=radioN]:checked').val() : tijd )
  if( (!fullDisp && (tijd.slice(1,4) == "A1N") && ($('input[name=radioN]:checked').val() == "2") ) || (tijd.slice(2,5) == "1N2")) {
    tijd = tijd.slice(0,4) + "2"
    t1 = pattvorm1
	t2 = pattvorm2
    hulp = pahulp }
	
  var cimp = false;
  var np = ""
  var p = ""
  var p2 = ""
  console.log(tijd)
  switch( tijd )
  { case "CA1N":
    case "CA1N1":
    case "CP1N":
    case "CP1N1":
      np = "ما "
    case "CA1P":
    case "CP1P":
      $("#con-en" + column).html(preHead + 'Past' + postHead);
      $("#con-ar" + column).html("الماضي");
      break;
    case "CA6N":
      np = "ما "
    case "CA6P":
      $("#con-en" + column).html(preHead + 'Past 2'+ postHead);
      $("#con-ar" + column).html("ماضي الناقِص");
	  temp_t1 = t1
      temp_t2 = t2
	  temp_hulp = hulp
      t1 = "كُن"
      t2 = "كان"
	  hulp = "H"
	  p = " "
      p2 = p + "ت"
      s12V = "ن"
      s2xx = "ن"
      s3xM = "ن"
      break;
    case "CA2N":
    case "CP2N":
      np = "لا "
    case "CA2P":
    case "CP2P":
	  $("#con-en" + column).html(preHead + 'Present'+postHead);
      $("#con-ar" + column).html("المُضارِع");
      p = ""
      p2 = "ت"
      s12V = "ن"
      s2xx = "ن"
      s3xM = "ن"
      break;
    case "CA4N":
    case "CP4N":
    case "CA4P":
    case "CP4P":
	  np = ( tijd.slice(3,4) == "N" ? "أَلَّا " : "أَنْ ")
      $("#con-en" + column).html(preHead + 'Subjunctive'+postHead);
      $("#con-ar" + column).html("المَنْصوب");
      p = ""
      p2 = "ت"
      s12V = "" 
      s2xx = ""
      s3xM = "ا"
      break;
    case "CA3N":
    case "CP3N":
      $("#con-en" + column).html(preHead + 'Future'+postHead);
      $("#con-ar" + column).html("المُسْتَقْبِل");
      np = "لَن "
      p = ""
      p2 = "ت"
      s12V = "" 
      s2xx = ""
      s3xM = "ا"
      break;
    case "CA3P":
    case "CP3P":
      $("#con-en" + column).html(preHead + 'Future'+postHead);
      $("#con-ar" + column).html("المُسْتَقْبِل");
      p = "سَ"
      p2 = p + "ت"
      s12V = "ن"
      s2xx = "ن"
      s3xM = "ن"
      break;
    case "CA5N":
      $("#con-en" + column).html(preHead + 'Imperative'+postHead);
      $("#con-ar" + column).html("الامْر");
	  cimp = true
      np = "لا "
      p = ""
      p2 = "ت"
      s12V = "" 
      s2xx = ""
      s3xM = "ا"
      break;
    case "CA5P":
      $("#con-en" + column).html(preHead + 'Imperative'+postHead);
      $("#con-ar" + column).html("الامْر");
	  cimp = true
	  t1 = t1.slice(1,t1.length);
	  t2 = t2.slice(1,t2.length);
	  p = ""
	  p2 = ""
      switch( pstamv ) {
        case 1:
          if( pthulp == "u" ) {
            p = "أُ" }
          else if (pthulp == "a" || pthulp == "i" ) {
            p = "اِ" }
          if( t1.slice(0,1) == "أ")
          { if( hulp == "" )
		    { t1 = t1.slice(2,t1.length)
              t2 = t2.slice(2,t2.length)
			} else
		    { t1 = "اِي" + t1.slice(2,t1.length)
              t2 = "اِي" + t2.slice(2,t2.length)
			  hulp = "B5"
			}			
          }
//          if( t1.slice(t1.length-1,t1.length) == "ى")
//          { t1 = t1.slice(0,t1.length-1)      
		    // hulp = "B5"
//          }
//          if( t1.slice(t1.length-1,t1.length) == "و")
//          { t1 = t1.slice(0,t1.length-1)      
		    // hulp = "B5"
//          }
          if( t1.slice(t1.length-1,t1.length) == "ي")
          { //t1 = t1.slice(0,t1.length-1)
            if( t1.slice(1,3) == "ْو" )		  
			{ t1 = t1.slice(0,1) + t1.slice(3,t1.length)
			  t2 = t2.slice(0,1) + t2.slice(3,t2.length)
			}
		    hulp = "B5"
          }
		  if( t1.slice(1,2) == "ْ" )
		  { t1 = p + t1
		  }
		  if( t2.slice(1,2) == "ْ" )
		  { t2 = p + t2
		  }
		  p = ""
          break;
        case 2:
        case 3:
        case 5:
	    case 6:
          if( t1.slice(0,1) == "ؤ")
          { t1 = "أ" + t1.slice(2,t1.length)
            t2 = "أ" + t2.slice(2,t2.length)
          }		  
          break;
        case 4:
          p = "أَ"
		  p2 = p
          break;
        case 7:
        case 8:
		case 9:
        case 10:
		case 15:
          p= "اِ"
		  p2 = p
          break;
      }
      s12V = ""
      s2xx = ""
      s3xM = "ا"
      break;
	case "CA1N2":
	  console.log("NEGATE2")
	  np = "لم "
      $("#con-en" + column).html(preHead + 'Past'+postHead);
      $("#con-ar" + column).html("الماضي");
    case "CA7P":
    case "CP7P":
	  if( tijd.slice(2,4) == "7P" ) {
        $("#con-en" + column).html(preHead + 'Jussive'+postHead);
        $("#con-ar" + column).html("المَجْزوم"); }
	  else {
	    tijd = "CA7P" }
      p = ""
      p2 = "ت"
      s12V = "" 
      s2xx = ""
      s3xM = "ا"
      break;
	case "C0P" :
	case "C0N" :
      $("#con-en"+column).html("&lt;Select tense&gt;");
      $("#con-ar"+column).html("");
	
  }

  // aanpassing negatieve vorm van كان
  if( tijd == "CA2N" && t1 == "َكُون" )
  { tijd = "CA1P"
    np = ""
    t1 = "لَس"
	t2 = "لَيس"
  }

  
    //Initialisatie
  var cv11 = "", ct11 = "", cs11 = false;
  var cv12m = "", ct12m = "", cs12m = false;
  var cv12v = "", ct12v = "", cs12v = false;
  var cv13m = "", ct13m = "", cs13m = false;
  var cv13v = "", ct13v = "", cs13v = false;
  var cv22 = "", ct22 = "", cs22 = false;
  var cv23m = "", ct23m = "", cs23m = false;
  var cv23v = "", ct23v = "", cs23v = false;
  var cv31 = "", ct31 = "", cs31 = false;
  var cv32m = "", ct32m = "", cs32m = false;
  var cv32v = "", ct32v = "", cs32v = false;
  var cv33m = "", ct33m = "", cs33m = false;
  var cv33v = "", ct33v = "", cs33v = false; 

  if( tijd.slice(0,2) !=  "C0") {

    if( tijd.slice(0,3) == "CA1" || tijd.slice(0,3) == "CP1" || tijd.slice(0,3) == "CA6" ) {
      //berekenen van de verleden tijd	
      cv11 = t1 + "ْتُ"
      cv12m = t1 + "ْتَ"
      cv12v = t1 + "ْتِ" 
	  if( t2 == "لَيس" || t2 == "كان") { 
  	    cv13m = t2 + "َ" }
	  else if ( !vActive ){ 
	    cv13m = t1 + "َ" }
	  else {
	    temp = $("#Base").html()
	    if( temp.indexOf(" ") > 0 ) {
 	      cv13m = temp.slice(0,temp.indexOf(" "))
	    } else {
	      cv13m = temp}
	  }
      cv13v = t1 + "َتْ"

      cv22 = t1 + "ْتُما"
      cv23m = t1 + "ا"
      cv23v = t1 + "َتا"
 
      cv32m = t1 + "ْتُم"
      cv32v = t1 + "ْتُنَّ"
      cv33m = t1 + "ُوا"
      if( t1.slice(t1.length-1,t1.length) == "ن" ) {
        cv31 = t1 + "َّا"; cs31 = true;
        cv33v = t1 + "َّ"; cs33v = true; }
      else { 
	    cv31 = t1 + "ْنا"
        cv33v = t1 + "ْنَ"
      }
      if(t1.slice(t1.length-1,t1.length) == "أ") {
        cv23m = t1.slice(0,t1.length-1) + "آ"; cs23m = true;
        // cv33m = t1 + "ُوا" + "<br>(" + t1.slice(0,t1.length-1) + "ؤُوا" + ")"; cs33m = true
      }
      switch( hulp ) {
        case "S": 
          cs13m = true;
          cv23m = t2 + "ا"; cs23m = true;
          cv23v = t2 + "َتا"; cs23m = true;
          cv13v = t2 + "َتْ"; cs13v = true;
          cv33m = t2 + "ُوا"; cs33m =  true;
          break;
        case "H": 
	      if ( !vActive ){ 
	        cv13m = t2 + "َ" }
          cs13m = true;
          cv13v = t2 + "َتْ"; cs13v = true;
          cv23m = t2 + "ا"; cs23m = true;
          cv23v = t2 + "َتا"; cs23v = true;
		  cs33m = true;
          if(t2.slice(t2.length-1,t2.length) == "ء" ) {
  	        if ( vActive ){ 
			  cv33m = t2.slice(0,t2.length-1) + "ؤ" + "ُوا"; }
			else {
			  cv13v = t2.slice(0,t2.length-1) + "ئ" + "َت"; cs13v=true;
			  cv23m = t2.slice(0,t2.length-1) + "ئ" + "َا"; cs23m=true;
			  cv23v = t2.slice(0,t2.length-1) + "ئ" + "َتا"; cs23v=true;
			  cv33m = t2.slice(0,t2.length-1) + "ئ" + "ُوا"; }				
          } else {
            cv33m = t2 + "ُوا";}
          break;
        case "B1": 
          cs13m = true;
          cv13v = t2 + "َتْ"; cs13v= true;
          cv23v = t2 + "َتا"; cs23v = true;
          cv33m = t2 + "وا"; cs332m = true;
          break;
        case "B2": 
		case "B6":
          cv33m = t2 + "ُوا"; cs33m = true;
          break;
        case "B4": 
        case "B3":
		  if( vActive ) {
          cv23v = t2 + "َتا"; cs23v = true;
          cv13v = t2 + "َتْ"; cs13v = true; }
          cv33m = t2 + "ُوا"; cs33m = true;
          break;
      }
    }  //einde berekenen verleden tijd

    //Aanpassen van hulp stammen voor VT2
    if( tijd.slice(0,3) == "CA6" ) {
      t2 = temp_t2;
	  t1 = temp_t1;
	  hulp = temp_hulp}
  
    if ( tijd.slice(0,3) != "CA1" && tijd.slice(0,3) != "CP1" ) {
      //Berekenen van tegenwoordige tijd / toekomende tijd / verleden tijd combo
      if(t1.slice(1,2) == "أ" ) { 
        //combinatie 2x alif
        ct11 = p + "آ" + t1.slice(3,t1.length); cs11 = true; }
      else if((t1.slice(1,2) == "ؤ")  && (tijd.slice(1,2) == "P") ) { 
        //combinatie 2x hamza, enkel bij passief
        ct11 = p + "أو" + t1.slice(3,t1.length); cs11 = true; }
      else {
        ct11 = p + "أ" + t1;}
	  console.log(t1)
	  console.log(ct11)
	  if( (t1.slice(t1.length-1,t1.length) == "ي" || t1.slice(t1.length-1,t1.length) == "ى" || t1.slice(t1.length-1,t1.length) == "و") && (tijd.slice(0,3)=="CA5" || tijd.slice(0,3)=="CA7")) {
        //korte klinker bij imperatief gebrekkige werkwoorden ++jussive (11, 12m, 13m, 13v, 31)	  
		ct11 = ct11.slice(0, ct11.length-1); cs11 = true;
        ct12m = p2 + t1.slice(0,t1.length-1); cs12m = true;
        ct13m = p + "ي" + t1.slice(0,t1.length-1); cs13m = true;
        ct13v = p + "ت" + t1.slice(0,t1.length-1); cs13v = true;
        ct31 = p + "ن" + t1.slice(0,t1.length-1); cs31 = true; }
	  else {
	    ct12m = p2 + t1;
        ct13m = p + "ي" + t1;
        ct13v = p + "ت" + t1;
        ct31 = p + "ن" + t1; }
      ct12v = p2 + t1 + "ِي" + s12V;

      ct22 = p2 + t1 + "ا" + s2xx;
      ct23m = p + "ي" + t1 + "ا" + s2xx;
      ct23v = p + "ت" + t1 + "ا" + s2xx;

      ct32m = p2 + t1 + "ُو" + s3xM;
      ct33m = p + "ي" + t1 + "ُو" + s3xM;
      if( t1.slice(t1.length-1,t1.length) == "ن") {
	    //laatste letter nun
        ct32v = p2 + t1 + "َّ"; cs32v = true;
        ct33v = p + "ي" + t1 + "َّ"; cs33v = true;}
      else {
        ct32v = p2 + t1 + "ْنَ";
        ct33v = p + "ي" + t1 + "ْنَ";}

      if(t1.slice(t1.length-1,t1.length) == "ؤ") {
	    // laatste letter alif met hamza
        ct12v = p2 + t1.slice(0,t1.length-1) + "ئِي" + s12V; cs12v = true;}

		
      if(t1.slice(t1.length-1,t1.length) == "أ") {
	    // laatste letter alif met hamza
        ct12v = p2 + t1.slice(0,t1.length-1) + "ئِي" + s12V; cs12v = true;
        ct22 = p2 + t1.slice(0,t1.length-1) + "آ" + s2xx; cs22 = true;
        ct23m = p + "ي" + t1.slice(0,t1.length-1) + "آ" + s2xx; cs23m = true;
        ct23v = p + "ت" + t1.slice(0,t1.length-1) + "آ" + s2xx; cs23v = true; }
//        ct32m = p2 + t1 + "ُو" + s3xM + "<br>(" + p2 + t1.slice(0,t1.length-1) + "ؤُو" + s3xM + ")"; cs32m = true;
//        ct33m = p + "ي" + t1 + "ُو" + s3xM + "<br>(" + p + "ي" + t1.slice(0,t1.length-1) + "ؤُو" + s3xM + ")"; cs33m = true;}

      if(t1.slice(t1.length-1,t1.length) == "ء") {
	    // laatste letter alif met hamza
        ct12v = p2 + t1.slice(0,t1.length-1) + "ئِي" + s12V; cs12v = true; 
        ct32m = p2 + t1.slice(0,t1.length-1) + "ؤُو" + s3xM; cs32m = true;
        ct33m = p + "ي" + t1.slice(0,t1.length-1) + "ؤُو" + s3xM; cs33m = true;}		
		
      if(t1.slice(t1.length-1,t1.length) == "ئ") {
	    //laatste letter ya met hamza
        ct32m = p2 + t1.slice(0,t1.length-1) + "ؤُو" + s3xM; cs32m = true;
        ct33m = p + "ي" + t1.slice(0,t1.length-1) + "ؤُو" + s3xM; cs33m = true;}
	
      switch( hulp ) {
        case "H":
        case "S": 
          if( t1.slice(t1.length-2, t1.length) == "يء" ) {
	        ct12v = p2 + t1.slice(0,t1.length-1) + "ئِي" + s12V; cs12v = true;
            ct22 = p2 + t1.slice(0,t1.length-1) + "ئا" + s2xx; cs22 = true;
            ct23m = p + "ي" + t1.slice(0,t1.length-1) + "ئا" + s2xx; cs23m = true;
            ct23v = p + "ت" + t1.slice(0,t1.length-1) + "ئا" + s2xx; cs23v = true;
            ct32m = p2 + t1.slice(0,t1.length-1) + "ئُو" + s3xM; cs32m = true;
            ct33m = p + "ي" + t1.slice(0,t1.length-1) + "ئُو" + s3xM; cs33m = true; }
          if( t2.slice(t2.length-1, t2.length) == "ن" ) {
            ct32v = p2 + t2 + "َّ"; cs32v = true;
            ct33v = p + "ي" + t2 + "َّ"; cs33v = true; }
          else if ( t2.slice(t2.length-2, t2.length) == "ِء" ) {
		    ct32v = p2 + t2.slice(0,t2.length-1) + "ئْنَ"; cs32v = true;
            ct33v = p + "ي" + t2.slice(0,t2.length-1) + "ئْنَ"; cs33v = true; }
          else if ( t2.slice(t2.length-2, t2.length) == "َء" ) {
		    ct32v = p2 + t2.slice(0,t2.length-1) + "أْنَ"; cs32v = true;
            ct33v = p + "ي" + t2.slice(0,t2.length-1) + "أْنَ"; cs33v = true; }
		  else {
            ct32v = p2 + t2 + "ْنَ"; cs32v = true;
            ct33v = p + "ي" + t2 + "ْنَ"; cs33v = true;}
		  if( tijd.slice(0,3) == "CA5" || tijd.slice(0,3) == "CA7" ) { //korte klinker bij imperatief holle werkwoorden ++jussive (11, 12m, 13m, 13v, 31)
		    ct12m = p2 + t2; cs12m = true;
            ct13m = p + "ي" + t2; cs13m = true;
            ct13v = p + "ت" + t2; cs13v = true;
            ct31 = p + "ن" + t2; cs31 = true; }
          break;
        case "B1": 
          ct12v = p2 + t2 + "ِي" + s12V; cs12v = true;
          ct32m = p2 + t2 + "ُو" + s3xM; cs32m = true;
          ct33m = p + "ي" + t2 + "ُو" + s3xM; cs33m = true;
          break;
        case "B2":
        case "B4": 
          ct12v = p2 + t2 + "ي" + s12V; cs12v = true;
          ct22 = p2 + t2 + "يا" + s2xx; cs22 = true;
          ct23m = p + "ي" + t2 + "يا" + s2xx; cs23m = true;
          ct23v = p + "ت" + t2 + "يا" + s2xx; cs23v = true;
          ct32m = p2 + t2 + "و" + s3xM; cs32m = true;
          ct32v = p2 + t2 + "ينَ"; cs32v = true;
          ct33m = p + "ي" + t2 + "و" + s3xM; cs33m = true;
          ct33v = p + "ي" + t2 + "ينَ"; cs33v = true;
          break;
	    case "B5":
          ct12m = p2 + t1.slice(0,t1.length-1); cs12m = true;
          cs22 = true;
          cs32v = true; 
		case "B6":
        case "B3": 
          ct12v = p2 + t2 + "ِي" + s12V; cs12v = true;
          ct32m = p2 + t2 + "ُو" + s3xM; cs32m = true;
          ct33m = p + "ي" + t2 + "ُو" + s3xM; cs33m = true;
          break;
      }
    }
  }

  // display results
  
  if( dp2 == "#VX" ) {
    rv11 = (cimp ? "" : np + cv11 + ct11)
    rv12M = np + cv12m + ct12m
    rv12V = np + cv12v + ct12v
    rv13M = (cimp ? "" : np + cv13m + ct13m)
    rv13V = (cimp ? "" : np + cv13v + ct13v)
    rv22 = np + cv22 + ct22
    rv23M = (cimp ? "" : np + cv23m + ct23m)
    rv23V = (cimp ? "" : np + cv23v + ct23v)
    rv31 = (cimp ? "" : np + cv31 + ct31)
    rv32M = np + cv32m + ct32m
    rv32V = np + cv32v + ct32v
    rv33M = (cimp ? "" : np + cv33m + ct33m)
    rv33V = (cimp ? "" : np + cv33v + ct33v) }
  else {
    $(dp2 + "11").html((cimp ? "" : np + cv11 + ct11)).parent().toggleClass(spec, cs11 && !cimp).toggleClass("ui-disabled",pplural || vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "12M").html(np + cv12m + ct12m).parent().toggleClass(spec, cs12m ).toggleClass("ui-disabled",pplural || vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "12V").html(np + cv12v + ct12v).parent().toggleClass(spec, cs12v).toggleClass("ui-disabled",pplural || vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "13M").html((cimp ? "" : np + cv13m + ct13m)).parent().toggleClass(spec, cs13m && !cimp).toggleClass("ui-disabled",pplural || vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "13V").html((cimp ? "" : np + cv13v + ct13v)).parent().toggleClass(spec, cs13v && !cimp).toggleClass("ui-disabled",pplural || vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "22").html(np + cv22 + ct22).parent().toggleClass(spec, cs22).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "23M").html((cimp ? "" : np + cv23m + ct23m)).parent().toggleClass(spec, cs23m && !cimp).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "23V").html((cimp ? "" : np + cv23v + ct23v)).parent().toggleClass(spec, cs23v && !cimp).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "31").html((cimp ? "" : np + cv31 + ct31)).parent().toggleClass(spec, cs31 && !cimp).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "32M").html(np + cv32m + ct32m).parent().toggleClass(spec, cs32m).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "32V").html(np + cv32v + ct32v).parent().toggleClass(spec, cs32v).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "33M").html((cimp ? "" : np + cv33m + ct33m)).parent().toggleClass(spec, cs33m && !cimp).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive)
    $(dp2 + "33V").html((cimp ? "" : np + cv33v + ct33v)).parent().toggleClass(spec, cs33v && !cimp).toggleClass("ui-disabled",vActive && hActive || (!vActive) && hPassive) }

  logFunctionTime("showTense-begin" + tijd)	
	
}

