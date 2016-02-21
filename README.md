# Web Scraper

Simple web scraper made with node.js


## Requirements

You will need the following:
* Your own [GitHub](https://github.com/) account
* [git](https://git-scm.com/downloads)
* [node.js](https://nodejs.org/en/)


## Getting Started

Before you continue, be sure that you have all the necessary [requirements](#requirements) for this project.

### Create Your Own "Fork" of this Project

"Forking" is like creating a copy of a project. While logged in to your GitHub account, ["fork" this repository](https://github.com/Learn-by-doing/web-scraper/fork). This will create a copy of the project, but in your account.

Once you've created your fork, you will need to download a copy of the git repository to your local machine. To do this you will "clone" the repository using the following command in the terminal window where you use git:
```
git clone https://github.com/YOUR_USERNAME/web-scraper.git
```
Be sure you replace **YOUR_USERNAME** with your GitHub username.


### Install Project Dependencies

Like any node.js-based project, you will need to run `npm install` to get all the necessary dependencies for running the project locally.

Once the install process has finished, move on to the next step.



## Using the program from the command line

Try running the program by entering the following the command:
```
node cli.js
```

You should now see the help menu:
```bash
  Usage: index [options] [command]

  Commands:

    traffic <subReddit> [moreSubReddits...]  Get traffic data for one or more sub-reddits

  Options:

    -h, --help  output usage information
```
This explains how to use the program.

Try using the `traffic` command:
```
node cli.js traffic bitcoin
```

You should see JSON output like this:
```js
{
  "bitcoin": {
    "monthly": {
      "2016/02": {
        "uniques": 311240,
        "pageViews": 2047459
      },
      "2016/01": {
        "uniques": 525246,
        "pageViews": 4105705
      }
      // ..
      "2015/03": {
        "uniques": 664930,
        "pageViews": 5782364
      }
    },
    "daily": {
      "2016/02/21": {
        "uniques": 14839,
        "pageViews": 61852,
        "subscriptions": 68
      },
      // ..
      "2015/12/28": {
        "uniques": 25651,
        "pageViews": 126991,
        "subscriptions": 167
      },
      "2015/12/27": {
        "uniques": 26370,
        "pageViews": 132347,
        "subscriptions": 125
      }
    }
  }
}
```

