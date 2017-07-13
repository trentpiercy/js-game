var app = new Vue({
  el: '#app',
  data: {
    score: "",
    showGame: true,
    showPlayButtons: true,
    showLeaderboard: false,
    showProfile: false,
    playNavActive: true,
    leaderboardNavActive: false,
    profileNavActive: false,
  },
  methods: {
    clear: function() {
      this.showGame = false;
      this.showPlayButtons = false;
      this.playNavActive=false;
      this.leaderboardNavActive=false;
      this.profileNavActive=false;
    },
    playClick: function() {
      this.clear();
      this.showGame=true;
      this.showPlayButtons=true;
      this.playNavActive=true;
    },
    leaderboardClick: function() {
      this.clear();
      this.leaderboardNavActive=true;
    },
    profileClick: function() {
      this.clear();
      this.profileNavActive=true;
    }
  }
})
