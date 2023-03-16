|\/||`` |\/|  /\ |``|
|  ||__ |  | /  \|__| sem4



##	
#########################################
#					#
#					#
# Parts : 				#
#   					#
# templates : 				#
# 		0 register/login	#
#		1 home			#
#		2 statements		#
#		3 goals			#
#		4 profile		#
#					#
#					#
# Sql : 				#
#	Table users			#
#		• user_id(Text)		#	
#			instead keep 	#
#			username unique	#
#			and fetch its 	#
#			column for a   	#
#			str usr enters.	#
#		• username(Text)P-key	#
#		• income(int)		#
#		• hash_pass(text)	#
#		• goal_id(int)AI,F-key	#
#		• 			#

	Table goals_of_users
		. goal


#					#
#	Table goals			#
#		• goal_id(int)		#
#		• goal_title(text)	#
#		• goal_discription(text)#
#		• goal_duration(time)	#		
#		• goal_target(int)	#
#					#
#					#
#########################################



To run this application:

```
flask --debug run
```


