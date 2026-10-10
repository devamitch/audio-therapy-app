export const BASEURL = 'https://test-api.me-mr.com' as const;
// export const BASEURL = 'https://dev-test-api.test.tech/api/' as const;

export const TOKELESS_URLS = {
	login: '/user/login',
	register: '/user',
	sociallogin: '/user/sociallogin',
	artist: '/user/artist',
	exists: '/user/exist',
	delete: '/user/delete',
	cencelDelete: '/user/cancel-delete',
} as const;

export const DIFFERENT_URLS = {
	google: 'https://www.googleapis.com/oauth2/v2/userinfo',
} as const;

export const URLS = {
	...TOKELESS_URLS,
	...DIFFERENT_URLS,
	userdetails: '/user/get',
	userupdate: '/user/update',

	upload: '/upload/icon',
	dashboard: '/dashboard',
	notifications: '/notifications',
	dashboardArtists: '/dashboard/artiststatus',

	challange: '/challange',
	challangeVote: '/challange/vote',
	challangeParticipants: '/challange/participants',

	artistDetail: '/dashboard/artistsdetail',
	getArtists: '/dashboard/getArtists',

	leagueListType: '/league/listtype',
	leagueSearch: '/league/spotify/search',
	leagueStars: '/league/liststars',
	leagueArtists: '/league/artists',
	league: '/league',
	transaction: '/transaction',
	rewards: '/rewards',
	leagueTeam: 'league/team',
	leagueRank: 'league/rank',
	updateLeagueTeam: 'league/leagueteam',
	joinedLeagues: '/league/filterLeague',
	scheduleLeagues: '/challange/schedule',
} as const;

export type URLS_TYPE = (typeof URLS)[keyof typeof URLS];

export type TOKELESS_URLS_TYPE = (typeof TOKELESS_URLS)[keyof typeof TOKELESS_URLS];

export type DIFFERENT_URLS_TYPE = (typeof DIFFERENT_URLS)[keyof typeof DIFFERENT_URLS];

// PROJECT_NAME="test App"
// REPO_URL="https://github.com/nonceblox/musix"

// {
//   echo "Project Name,Repository URL,Commit Hash,Author,Date,Subject,Body,Refs,Insertions,Deletions"
//   git log --since="2024-01-01" --until="2024-08-02" --author="techamit95ch" --pretty=format:"$PROJECT_NAME,$REPO_URL,%H,%an,%ad,%s,%b,%D" --shortstat --date=short
// } > test.csv
