import cgi

data = cgi.FieldStorage() 
print(data.getfirst('chatData'))
