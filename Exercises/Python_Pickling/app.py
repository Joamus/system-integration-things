import pickle
from user import User

filename = 'data.txt'

myUser = User("joak1584@stud.kea.dk", "hello", 1)

print("BEFORE PICKLE:")
print(myUser.username)
print(myUser.password)
print(myUser.role)
myUser.login()
myUser.logout()

outfile = open(filename, 'wb')
pickle.dump(myUser, outfile)
outfile.close()

infile = open(filename, 'rb')
unpickledUser = pickle.load(infile)
infile.close()

print("AFTER PICKLE:")
unpickledUser.login()
unpickledUser.logout()
print(unpickledUser.username)
print(unpickledUser.password)
print(unpickledUser.role)