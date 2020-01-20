class User:
	def __init__(self, username, password, role):
		self.username = username
		self.password = password
		self.role = role
	def login(self):
		print("User is now logged in")
	def logout(self):
		print("User is now logged out")