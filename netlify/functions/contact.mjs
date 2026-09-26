const json=(statusCode,body)=>({statusCode,headers:{"Content-Type":"application/json","Cache-Control":"no-store"},body:JSON.stringify(body)});
const esc=(s="")=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const emailOk=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const handler=async(event)=>{
  if(event.httpMethod!=="POST")return json(405,{error:"Method not allowed"});
  if(!process.env.RESEND_API_KEY)return json(500,{error:"Mailservice niet ingesteld"});
  let data;try{data=JSON.parse(event.body||"{}")}catch{return json(400,{error:"Ongeldig verzoek"})}
  const name=String(data.name||"").trim(),email=String(data.email||"").trim(),message=String(data.message||"").trim(),company=String(data.company||"").trim();
  if(company)return json(200,{ok:true});
  if(!name||name.length>100||!emailOk(email)||email.length>200||!message||message.length>5000)return json(400,{error:"Controleer de ingevulde gegevens"});
  const text=`Nieuw bericht via birkenholz.nl\n\nNaam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`;
  const html=`<h2>Nieuw bericht via birkenholz.nl</h2><p><strong>Naam:</strong> ${esc(name)}<br><strong>E-mail:</strong> ${esc(email)}</p><p><strong>Bericht:</strong></p><p style="white-space:pre-wrap">${esc(message)}</p>`;
  try{
    const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Webdesign Birkenholz <contact@birkenholz.nl>",to:["m-birkenholz@hotmail.com"],reply_to:email,subject:`Nieuw contactbericht van ${name}`,text,html})});
    if(!r.ok){console.error("Resend error",r.status,await r.text());return json(502,{error:"E-mail kon niet worden verzonden"})}
    return json(200,{ok:true});
  }catch(err){console.error("Contact function error",err);return json(500,{error:"Serverfout"})}
};