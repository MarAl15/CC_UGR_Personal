#!/usr/bin/env python


from telegram import (ReplyKeyboardMarkup, ReplyKeyboardRemove)
from telegram.ext import (Updater, CommandHandler, MessageHandler, Filters, RegexHandler,
                          ConversationHandler)




import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)


NIssues = 0
Issues = list()

def start(bot,update):
	update.message.reply_text("Hi! I'm IssueBot. Please use /help to see the commands")

def help(bot,update):
	update.message.reply_text("Commands:\n /add_issue <description of the issue> to add a new issue.\n /see_issues to see all the issues.\n /delete_issue (this feature will be added in the next version)")
	
def addIssue(bot,update,args):
	global NIssues
	if len(args) >= 1:
		NIssues += 1
		str_iss = "#" + str(NIssues)
		for a in args:
			str_iss = str_iss + " " + a
		Issues.append(str_iss)
		update.message.reply_text("Issue #" + str(NIssues) + " added.")
	else:
		update.message.reply_text("Use: /add_issue <description of the issue>")


def seeIssues(bot,update):
	for iss in Issues:
		update.message.reply_text(iss)

def getUpdates():
	return "hola"

def main():
	"""Run bot."""
	updater = Updater("768646003:AAEcUjONl0oSFCpP-b66YD0-sbOpd30qxsw")

	# Get the dispatcher to register handlers
	dp = updater.dispatcher

	# on different commands - answer in Telegram
	dp.add_handler(CommandHandler("start", start))
	dp.add_handler(CommandHandler("help", help))
	dp.add_handler(CommandHandler("add_issue", addIssue, pass_args=True))
	dp.add_handler(CommandHandler("see_issues", seeIssues))
  

	# Start the Bot
	updater.start_polling()

	# Block until you press Ctrl-C or the process receives SIGINT, SIGTERM or
	# SIGABRT. This should be used most of the time, since start_polling() is
	# non-blocking and will stop the bot gracefully.
	updater.idle()


if __name__ == '__main__':
	main()	

