const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));

const form=document.querySelector('#contact-form');const status=document.querySelector('#form-status');const submit=form?.querySelector('button[type="submit"]');
form?.addEventListener('submit',async(e)=>{e.preventDefault();if(!form.reportValidity())return;submit.disabled=true;const old=submit.firstChild.textContent;submit.firstChild.textContent='Versturen… ';status.textContent='';
  const data=Object.fromEntries(new FormData(form).entries());
  try{const res=await fetch('/.netlify/functions/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const body=await res.json().catch(()=>({}));if(!res.ok)throw new Error(body.error||'Verzenden mislukt');form.reset();status.textContent='Bedankt! Je bericht is verzonden. Ik neem zo snel mogelijk contact met je op.'}
  catch(err){status.textContent='Het versturen is niet gelukt. Probeer het later opnieuw.'}
  finally{submit.disabled=false;submit.firstChild.textContent=old}
});