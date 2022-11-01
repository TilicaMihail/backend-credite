.env variables are: MONGO ( mongo address ). JWT_KEY ( random string, 10+ chars ), MASTER_PASSWORD ( random string, used for register ), CLIENT_URL ( client adress to allow cors )
Pentru ca notificarile sa functioneze trebuie configurata o adresa de email ( vezi /controllers/projects line 203 )
Ce ar mai trebui facut:
    - fise cu credite printabile
    - make 'makeDbBackup' function
    - review cron jobs in index.js pls ( s-ar putea sa fie gresite cron string-urile )
    - take a look at endOfYear job in ./job/Jobs.js
    - trebuie vazut daca elevii care au terminat clasa 12 trebuie stersi din app