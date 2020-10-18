from twilio.rest import Client 
 
account_sid = 'AC2e3df18d71dff943e78320f145f29052' 
auth_token = 'be37a141d1d080d6cc9eaf0647fb14b7' 
client = Client(account_sid, auth_token) 
 
message = client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body='hola, buen día',
                              to='whatsapp:+5215583023701' 
                          ) 
 
print(message.sid)