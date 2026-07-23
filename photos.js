// =============================================================================
// DICCIONARIO DE FOTOS DE JUGADORES (CÓDIGO DE BARAJITA : URL DE LA FOTO)
// Solo es para las imagenes de las cartas nada más
// =============================================================================

const PLAYER_PHOTOS = {
    // --- México (MEX) ---
    "MEX-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCDkZ8xtzSO7y-acWQVf1f_L4NjpLkql6NyV9-dRRsg&s=10", // Escudo FMF
    "MEX-2": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ger-Mex_%285_cropped%29.jpg", // Guillermo Ochoa
    "MEX-3": "https://upload.wikimedia.org/wikipedia/commons/3/30/Jorge_S%C3%A1nchez.png", // Jorge Sánchez
    "MEX-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGE09niap76cgDr5pdplNigttHn-RplA908k8PBRBog&s=10", // César Montes
    "MEX-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5uegscEg-qydL3v_aLWGuCz0xj6HSuvyOPKx2HlPSVA&s=10", // Johan Vásquez
    "MEX-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawl2d7RtbzCsktw9QC5P8rRyScEZkGC6YUR2FIuIrUA&s=10", // Gerardo Arteaga
    "MEX-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs9M7rCWTvOmxmOCcNAqwRXJzmdivMjar3PR4GDme_2w&s", // Edson Álvarez
    "MEX-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6t8f1vRIdOaVSpIsCZPWoG1S0YfEuir-Wn-2-POMuw&s=10", // Luis Chávez
    "MEX-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yOuiyqF99j9wLTvD1GCIUuIVmbWVV9JcZVaZDKf4SQ&s=10", // Erick Sánchez
    "MEX-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIt6g8vr8m_lB6INRKoifJLaIvpXVXPS4DUOBvvCjEkQ&s", // Santiago Giménez
    "MEX-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt5aIKWKh7K5VjkXR6EcudF3Bw2LdLRztIunPANHhOGQ&s=10", // Hirving Lozano
    "MEX-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdKlet83_sfjRzO5rL2uIjkzXxje2B5pEaNTY83H3uzw&s=10", // Uriel Antuna

    // --- Sudáfrica (RSA) ---
    "RSA-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKv0im6Yd_m2ayRMfN39ZMoi3V5VsHHTkkfdDb9V5KLw&s=10", // Escudo SAFA
    "RSA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxpD7qzPZFEgQegGJ-qfRn46C-t4z7wSDjqPBaScvNw&s=10", // Ronwen Williams
    "RSA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdtFaCDE6PqQ8YxPliTurvKpWr2Z5Y260luFq2uWPHvA&s", // Khuliso Mudau
    "RSA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTur05cFEl-rXXzFW5NJMLuebWWZxj6LoUJ_QECocPj2g&s=10", // Siyanda Xulu
    "RSA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC8GoSCmVqR9vnTv7cT5U82cSPExFukrXuKh2QuR7RYw&s=10", // Mothobi Mvala
    "RSA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfiA6p7n9g3aJZvQaLagITPVtterhjE_Ql0qF3yiad1w&s=10", // Aubrey Modiba
    "RSA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKH4Feh5xWN41fpweJgpqMKcEcnNRGTKb4WdMhzLic5w&s", // Teboho Mokoena
    "RSA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKmWZxB0nQ7pqfVX-CM2bOaf16x7hfZLsXALJx9IgBA&s=10", // Sphephelo Sithole
    "RSA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBqSD1vdbdUxYD5O5bPb6jhjsS1lI6BM8-2zZfeyKbEA&s=10", // Thapelo Morena
    "RSA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZlZKQvNDngOO79www1ZSRCIe4PoYY1g7YgmUTMNvBQ&s=10", // Percy Tau
    "RSA-11": "https://www.footballdatabase.eu/images/photos/players/a_151/151323.jpg", // Themba Zwane
    "RSA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTor8EILEqkdki39OcQgZphrBEPAqEi1qg4SnDAlHaoVA&s", // Evidence Makgopa

    // --- Corea del Sur (KOR) ---
    "KOR-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl1kM6ikRVy8R4gn_SIADuNF7V_sk8JfZewu8zttkDOw&s=10", // Escudo KFA
    "KOR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS--ZbfBtHjAQNUhvYgWXYQB4z66s-3tXFJltYMRXbGVA&s=10", // Jo Hyeon-woo
    "KOR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4GhMBOfuLIol4_ryfasnaQmFhBN5u_Z-qqkS7GSA-Ow&s=10", // Seol Young-woo
    "KOR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVFUhyhOGZUf525EypYFt6BNsvEUApeZU77PvaA9MSTA&s=10", // Kim Min-jae
    "KOR-5": "https://upload.wikimedia.org/wikipedia/commons/9/91/220528_FC_%EC%84%9C%EC%9A%B8_vs_%EA%B9%80%EC%B2%9C_%EC%83%81%EB%AC%B4_FC_%28%EC%A0%95%EC%8A%B9%ED%98%84%29.jpg", // Jung Seung-hyun
    "KOR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBslvLNFt_8V-FRNoOS6u1Tf8ET_mzAmPrpR6ahjcTsw&s=10", // Kim Jin-su
    "KOR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyuCtGJwGCpY2e8o05zCwoSTg5HgZsjsmwLt97gEYRQ&s=10", // Hwang In-beom
    "KOR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQAdxPmJcqMIEBW4gxT-OTXYepGjCYJBYD79jDIJzvw&s=10", // Lee Jae-sung
    "KOR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfV5P4VGAMZmMRuLiy3tZepF28oh-mSbz485OUsRmWA&s", // Lee Kang-in
    "KOR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuFlFQuLA-FQ0gOfvRlhHM_V39BGXroyFsp7QjFeYg2w&s", // Son Heung-min
    "KOR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SpMICAuBFwN2cKJd5s1DTxXKjeqJZ0kRKWdQ1KKTBQ&s=10", // Hwang Hee-chan
    "KOR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEjrYoWj_ra0D3k15jMkhGwxvauCiZT1VBMDaiP_rFsA&s=10", // Cho Gue-sung

    // --- Chequia (CZE) ---
    "CZE-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIC7hl8mSPH9dj7PCk1aXLHyF9PfdV2dfnQDo2HWX1uA&s=10", // Escudo FAČR
    "CZE-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2JOoNsVoX9i8jOCTHx-ezzt4IcgskxhFbXAMwCt_pQA&s=10", // Jindřich Staněk
    "CZE-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlOtHrIkUTssBbSQqC4f0a9iYPR63fo5C294-FMzDxw&s=10", // Vladimir Coufal
    "CZE-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZge7zGsjm4soGs9OUdLHtiR9Q3VL8sW5lGxP-O3bKCg&s=10", // Robin Hranáč
    "CZE-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFSc04rKJ6_hHSzYqo0rkMysmN4cXzgsQR8PG2H7TLQ&s=10", // Ladislav Krejčí
    "CZE-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpv50lYia6xxsteMdlyeIQbH2RdFLob1d7J-nT5DgHpQ&s=10", // David Jurásek
    "CZE-7": "https://es.wikipedia.org/wiki/Tom%C3%A1%C5%A1_Sou%C4%8Dek", // Tomáš Souček
    "CZE-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7LXrKkRECqCSWoMaq1YttO5KjYABzP3J_FX73WmxgYA&s=10", // Lukáš Provod
    "CZE-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNa7uP1a13pyJkKmGedqWd_TX62ZGbyW300gtt6Z6Dg&s", // Antonín Barák
    "CZE-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfGq4u2u6xdL3lgVvkCaVb80hAgJRcxnNvMHOzoNun7Q&s=10", // Patrik Schick
    "CZE-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgUgAn7KruyEQuxpynPiZO-3LqNmID_wAvcU9NJzashg&s=10", // Jan Kuchta
    "CZE-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6rM2OqA5qL4pPCcW5MroskIgqnro6KiQVgIWxLeJGQ&s=10", // Adam Hložek

    // --- Canadá (CAN) ---
    "CAN-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEed28w4IbywHeWsiCC8AqnaBkoYaeFxkfPNYBd5SWw&s=10", // Escudo Canada Soccer
    "CAN-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIyIxgxtBgRP6aw4hup3kesROo9CJMOgnzkGOTQzV8Q&s", // Maxime Crépeau
    "CAN-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQi-fvsfEp603XNXvmBYMu7NGLlRq85oefAvKtOO0WtA&s", // Alistair Johnston
    "CAN-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNHSQym1umnHkey_9pJI0S6SzxTdgusnX9YnckmGldsg&s", // Moïse Bombito
    "CAN-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ9HB_RbeDXhlYihvIPe1VZ_3t1bf_Gn0tATJ-HgeHoA&s=10", // Derek Cornelius
    "CAN-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7ubKlRsFGbt_qzjV88vtpvmZZXj9755Fc__icuMMrg&s", // Alphonso Davies
    "CAN-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc3-gNqquFNJEaE4J4Ui9ViU4ToGoEsYuhF8KhgacFg&s", // Stephen Eustaquio
    "CAN-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_6BwibGHzttEsNuuxkgDluMV8q-LcmZMldUz47rk5TA&s", // Ismaël Koné
    "CAN-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LwIQOHXaityLbQnTCM6FsZ82gQeN6nQOUs5RbeklLQ&s", // Jonathan Osorio
    "CAN-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOht92_0wQesUAgW2JvPbrTbFbyHGYKItzP1G4ZBBjsw&s=10", // Jonathan David
    "CAN-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRei2ldcyGmVHA3sfEQtl7IuCMZAT764EagWwhu0Ty4-w&s", // Cyle Larin
    "CAN-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsTF8tBliJSzgex9x4Pzqvx0RdhKIpJCIFQKe0lOrM6w&s", // Tajon Buchanan

    // --- Bosnia y Herzegovina (BIH) ---
    "BIH-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtGecPyXCYCrLJbw_dLubMn6klOYYtnnv8tiMoUnIgYWDqbVwJrJX-hTo&s=10", // Escudo N/FSBiH
    "BIH-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlkWlEQPGj74ZhVY9_76YOGboJ1zfk0D2NRCrUTYPSeA&s=10", // Ibrahim Šehić
    "BIH-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm2FNu26b-Pd2gwX9C6a63ZvLryz1Bg-gZGNIzdUhTSg&s=10", // Jusuf Gazibegović
    "BIH-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUau1yMxvmonlfL_Z1Hi5h-aOqowlS_RjRXHnxaJ9r-g&s=10", // Anel Ahmedhodžić
    "BIH-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXsZledZYq68y6qGSyIp99jG0c7ndGZ66gXHHu0VD2A&s=10", // Dennis Hadžikadunić
    "BIH-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkFxogIzChNY4LH91I8jSTibd1xQEnAp2gYzUG6kLMA&s=10", // Sead Kolašinac
    "BIH-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYM5zQPEsUMkQCEdO6LH7dg7c_bRhkSqhM7Gp2YJsKEA&s=10", // Rade Krunić
    "BIH-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReewranWNtcnSkg3geWgkXLne-eNeT-MaXfWH25Uvcyw&s=10", // Amir Hadžiahmetović
    "BIH-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKY4YyV3I_beZWlVcfTcGPeMVB82pu9-QHjio1Q5xEpg&s=10", // Benjamin Tahirović
    "BIH-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTnfYIyK-fjTekLq6SVMB7HVXjf_rv37yka_nruzIjQw&s", // Edin Džeko
    "BIH-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQazeXR4N54pKDQ6WewT0VlscMVdpbw42b1X03JinDTYg&s=10", // Ermedin Demirović
    "BIH-12": "https://assets.bundesliga.com/player/dfl-obj-j0117m-dfl-clu-000004-dfl-sea-0001ka.png", // Haris Tabaković

    // --- Catar (QAT) ---
    "QAT-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuORpqaTStHIF7Oaf4qVgR0aSVC_NK4Wh2wE710AwCaw&s=10", // Escudo QFA
    "QAT-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYnjTRt5dZX8AdIrufsuDlfB6FoKJaiaC19lx3zt8AA&s", // Meshaal Barsham
    "QAT-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsAUmH3Tb17-obslvkAp2cBKZsXi7nUU9upTOOWZMfA&s=10", // Pedro Miguel
    "QAT-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvp_nAn1I2prAgPZPZIsnYfZWGg50PRLoq6ucuNoR_tA&s", // Lucas Mendes
    "QAT-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoILtjtGuGx3y50mXCaTEn8dFryhTSigJMWRBaZqFw4g&s=10", // Boualem Khoukhi
    "QAT-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGUboPFtx9xI9ZOlt2jikUksu0iv9FE2klLM4nTm2Qg&s=10", // Homam Ahmed
    "QAT-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Bb9ckMsmlQkLxP2k5BKc37aqoBpTEg6wKULPkIpRmw&s=10", // Hassan Al-Haydos
    "QAT-8": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Ahmed_Fathy.jpg", // Ahmed Fathy
    "QAT-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9D0yr-3UI7AX8cIJoT8vMExhyYTYfiGhGUBeSGyNa3w&s", // Jassem Gaber
    "QAT-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJtkSjDQGqNcGYsXOoj11H4I_ENpUP1dXganKaC-pPA&s", // Akram Afif
    "QAT-11": "https://es.wikipedia.org/wiki/Almoez_Ali", // Almoez Ali
    "QAT-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5QRdo_iAszq5SQ587IOWmZYI47kwe-8twCpYZa3vfQ&s", // Yusuf Abdurisag

    // --- Suiza (SUI) ---
    "SUI-1": "https://1000logos.net/wp-content/uploads/2024/06/Switzerland-National-Football-Team-Logo-1992.png", // Escudo SFV
    "SUI-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbT-TXWsmkrXj0M-qhtuywr7p_dukvf-wla5Q7Xuxvw&s=10", // Yann Sommer
    "SUI-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkXhBMYcHTOr8vo8ONwjdl9ZFXdVQQTLj5GI9Q22tc0Q&s=10", // Silvan Widmer
    "SUI-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyPrkyiREJ5Kf2HydyoqfTKCHgpzigw5xwIPYo0bXnkA&s=10", // Manuel Akanji
    "SUI-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPQiZLrlIHSFnWWHG_lef1gu1y-xhtta4RbJtESk_Zw&s=10", // Fabian Schär
    "SUI-6": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ricardo_Rodr%C3%ADguez_2018.jpg", // Ricardo Rodríguez
    "SUI-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRATOCzmlBK2l6KALgh1kHBxTN7rrwt5BxTrli55liScA&s", // Granit Xhaka
    "SUI-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Xj5mgEgYKPzZdBDwhn4PChdC1I_hvSIrvrySHBzyGw&s=10", // Remo Freuler
    "SUI-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Pwa4MiYaEud2sfEe6-EuqkOBXMpy3h3sSmbJFi-A9w&s=10", // Denis Zakaria
    "SUI-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUTKetUPxA8Nn6nD20oufsD7RJ0-Se-x9btBoETFAkQ&s", // Xherdan Shaqiri
    "SUI-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH3PMLStdAloH7Oi426ehCKlOrjF-flMOWeWzfLkenqg&s=10", // Dan Ndoye
    "SUI-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRmizeazYTCwqr1w8TzDnanalKb5Vmor-luCULC-QLbg&s=10", // Breel Embolo

    // --- Brasil (BRA) ---
    "BRA-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrvOBaV-o-2c1Uz458j5z94FWyPa3P_8cx5iGGX0HQA&s=10", // Escudo CBF
    "BRA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbgsHC5uhSOvYTGnadXs8jvfA0mnJQqrUCvVf1_lWoqQ&s", // Alisson Becker
    "BRA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgsmoeS0_dS5DlJrXXhMxBghCISPUObkPd6mM-QLKJew&s=10", // Danilo
    "BRA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvGEhZIUX4BwxCyvQI3k6sJDsTcDTW55aPIWthv9gXA&s", // Marquinhos
    "BRA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdkmd4F_UCkOBU5S_0HkdyS-v4j3pPj3WrqppGDIm2Q&s=10", // Gabriel Magalhães
    "BRA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSULcqQh6jGVatTROl4HD4XOtQxuSbWhIQHr4OF1ScMyw&s=10", // Wendell
    "BRA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOS3YNJN-439LsOUTErG65zvepzaRBggW2MiguH0hofg&s", // Casemiro
    "BRA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5c_kypEMLx3NwQCHv-Ujvup0lA9d_iQIF4vwTkbidPQ&s", // Bruno Guimarães
    "BRA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpKJpLbs3KzwsTO5mgT0N5RPtEwwiHm6zjq-AG0N0ENA&s=10", // Lucas Paquetá
    "BRA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaz5nrtMsBvNOuqG3EO5aG0CBY7AhA--qHpzAatxlZQ&s=10", // Vinícius Júnior
    "BRA-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLwTPYQGHhBxhPseE8ltRDQV7bVNA_bLhzIU61_Fxcg&s", // Rodrygo Goes
    "BRA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQjQaUXG2dnZyqPVYTNY4A8lKKJoiVZTaIT5M5emgQA&s", // Endrick

    // --- Marruecos (MAR) ---
    "MAR-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrapqk2HR8REKQSogSikoLkqx_FNiDXBPVixrXT0q5ZQ&s=10", // Escudo FRMF
    "MAR-2": "https://upload.wikimedia.org/wikipedia/commons/5/53/Yassine_Bono_%28cropped%29.jpg", // Yassine Bounou
    "MAR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBKdb6kD6yWQmAxXCgLq1DhhtFoI5jp2uDzowOfGZXxw&s", // Achraf Hakimi
    "MAR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71egKaC4Q_7Is4crQhKMGhjNwVO528-cO_PrhbA2wrg&s=10", // Nayef Aguerd
    "MAR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJL6OIfKfKdye_vwOB4nPggumL_MxZ1QuUBbm08_TKYw&s=10", // Romain Saïss
    "MAR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LGnnz8fywP7BQTjprpTZael-ADiJ1gv6YL-JQ3DYkA&s=10", // Noussair Mazraoui
    "MAR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjzONjv0_Zj6vji08R1xYmcEoUaUOcCcNlVozkp5aHzw&s=10", // Sofyan Amrabat
    "MAR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxxpfL7ui5YhKrdVCj4xHkXkfizbr2ACJ2cb4CjvS2g&s", // Azzedine Ounahi
    "MAR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFzSLJmLrEHxTGA_1eA7a5HMRc3GGW_X1I9FVgztiGA&s", // Brahim Díaz
    "MAR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXlnp73zmgttoUSCYLhUzlvZjhqKRc4_InQcTyEMhGQ&s=10", // Hakim Ziyech
    "MAR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0ZVKxanpTO3GJrvOLxY2eJUWudwdSp4gajimgNLWjw&s=10", // Youssef En-Nesyri
    "MAR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90l8afB0lPj7sNLP6T0egg12jKSH-sDjgYUcw4ZJxTg&s=10", // Amine Adli

    // --- Haití (HAI) ---
    "HAI-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzugwu5CYh4WXLQnN72GZGFcGOh1KOiCBGMxA-D1Z4g&s=10", // Escudo FHF
    "HAI-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOQZd2W00tCoFZIqhlng33b4MX-LOxyH4j7HzwqnnMQ&s=10", // Johny Placide
    "HAI-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVBAutLtnw824PKKrTXqy1JWGIXhzV_lSom8ZV94FkUQ&s=10", // Carlens Arcus
    "HAI-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdsKQsQuNbNGUvV5ZMUhx0RJ_lC5sntRHupQ7FeXvEfg&s=10", // Ricardo Adé
    "HAI-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo9iZ59EG9gkHhv3rNG4aMAy6KbS0ZHo0jVEfBDQq_&s=10", // Alex Christian
    "HAI-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_b1SkxEjpxxgnFVbfpso0tLsue4Yq-btM4RujzYAxg&s=10", // Stephane Lambese
    "HAI-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhV4WaGjcztXw7urHAzXrRNVarFPNS2vL9Ns8jLvRPsg&s", // Bryan Alceus
    "HAI-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZbJgNVWxRjbepktxAV9lMiGHNYSwUfWE3SkP4mYdRg&s=10", // Leverton Pierre
    "HAI-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsFU2vLFnEiZfx5rn67xlxkiD9aNIV4-sQ5eDluT5b6w&s=10", // Danley Jean Jacques
    "HAI-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNa2PoeJ2c665vcRnWO6ymDcnNPtVbethLNi4Nz0krYw&s=10", // Duckens Nazon
    "HAI-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqHiSZ3aNsovCPwd0UBKpXig0nzrSrQ1VzjULKcXYRGA&s=10", // Frantzdy Pierrot
    "HAI-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcaAMMfoskxujCsE3NGdvjNeWe3ROSB3XMwGnrYEhhEQ&s=10", // Derrick Etienne Jr.

    // --- Escocia (SCO) ---
    "SCO-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfq75T7gB536rUQXWnht5jsgRG_xUoDVwzjjvjotRYhw&s", // Escudo SFA
    "SCO-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn_VUsWYP4uTJDbqBstrbVWLDNKsFvwpeMMvUhVV8hzw&s", // Angus Gunn
    "SCO-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQObOAxsjtAF7NVFjGiF7b571eCO89CIrqFaYPW5oaF6g&s", // Anthony Ralston
    "SCO-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2CXSOoPrrfSR7erKB-pMKRiz4_mtwUBdjpmFJ4WElmA&s", // Grant Hanley
    "SCO-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUTkV1vZlDwHTSMKllc8mSdAaOJ9tc7Pt3aUDt6JHnw&s", // Jack Hendry
    "SCO-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5IV74bQUKRU3au5WQRY2pC3F8za7Uw-wEW2v90OeWhA&s", // Andrew Robertson
    "SCO-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fY8-WeBZktu72x6RVgsXWkO8T-0Zvz-zMf8y2FhpNw&s=10", // Scott McTominay
    "SCO-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq-ixedRaV1d_tw0NNyxAvSUVDZ-C-AqHgoNtved-CJw&s=10", // Callum McGregor
    "SCO-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPWpPl9LagM2vMmHBdUgynI-cbiUKNOAlHQ97-YoWPA&s=10", // John McGinn
    "SCO-10": "https://upload.wikimedia.org/wikipedia/commons/6/67/Che_Adams_Scotland_v_Bolivia_6_June_2026-37_%28cropped%29.jpg", // Che Adams
    "SCO-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVdbP2AcZ3WFicyhGjAyJyF8EaM6_1evlTINkYjDdQHg&s", // Lawrence Shankland

    // --- Estados Unidos (USA) ---
    "USA-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg3a8lUDyCq4ksZ2FUoleU42KIrrhKjxqSFXE7xFZVvw&s=10", // Escudo US Soccer
    "USA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStmqJevfhOZ1wFLUPqOH_ta320a2HNUVIqI5J5GW-70w&s", // Matt Turner
    "USA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtD_v6LIwzBZ7kQ5Q-WKzES45xRIkn2WMCE2OQpwjHdA&s", // Sergiño Dest
    "USA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrPlV3RnZLxDk82sWB0unL_jHiSlvTRerXyVRru5p5Zg&s=10", // Chris Richards
    "USA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ226eNLUirQQPbGdz5aQghNvL_6dKVj01lEkRp9TEIpw&s", // Tim Ream
    "USA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScilxr5fPlJYQwS9NvrXnSDKLxeJQFXZyikjk30VJy0w&s=10", // Antonee Robinson
    "USA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZj0xJc0CB6UmhrpdyNWHAWfqIO1xtAlQ-XTTyyqnjw&s", // Tyler Adams
    "USA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRq-_VNc1g-dnSrQrWqQTraLVPfQV2rH2YRhTv3oczA&s=10", // Weston McKennie
    "USA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgM1WlPlCEw1yvpIlarmZomv8DZlBsaWRd-4rWDUR6UA&s=10", // Yunus Musah
    "USA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVPqjpM-InVqRSXIPUykHd3M1Zg4XSnjTHmVbszQ3FA&s=10", // Christian Pulisic
    "USA-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI6C3qDAKhRIreH6LgriWCaaiYXt8mN64Mp0hPJbO6Sw&s", // Timothy Weah
    "USA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAva00qOLHgeM1Aapt4R99B654MHjaVs_oFChPTS4xWg&s=10", // Folarin Balogun

    // --- Paraguay (PAR) ---
    "PAR-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFNn6SZZ9LBbHnYwFiKPOT3DFPCWdlARpqbfMzHLDeJw&s=10", // Escudo APF
    "PAR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdWKL0iShuqZAeq7BhGNU5LpWNIepkVvmnvlpcRUbwA&s=10", // Carlos Coronel
    "PAR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Dk7sYY4XeeWpelp0JRnqnNx4Od5vczLe6jMGqJw7ag&s=10", // Gustavo Velázquez
    "PAR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwR4rPWacmzvJ96t3n4dZhvJOoAekVpa3EU_N8oOgLuw&s=10", // Gustavo Gómez
    "PAR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sYmB8-Lc8ljCEqfyLvfmLrWYrIOWaJb9CAZVzISb4A&s=10", // Omar Alderete
    "PAR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHP6M3T4Qv9cGbFe7uVkuoQHlVFilcbLFFkoKN3n83zg&s=10", // Junior Alonso
    "PAR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBjESEKH9PZ5nIWhJu-DJbNGZqSo41V5yB2oCBVuyWiw&s=10", // Mathías Villasanti
    "PAR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRon85jIUhHm4lnl3ZbX76LAD89DfO_nRyu3Bv_PNffKQ&s=10", // Andrés Cubas
    "PAR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFitHP1ZZYhqgmRy3-nP2OpHTx0l3Mg7FIE3QhR3GDzg&s=10", // Julio Enciso
    "PAR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybpAM3qSMDIIIKF7luxdMIXj4lFlCiygeMfM8s8EhaA&s", // Miguel Almirón
    "PAR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjyYAQhuVK6GRHQBKltPeWELuEuH7Dp7puLFTHxG1Xzg&s", // Ramon Sosa
    "PAR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRJsvGj7prRLYOQk2nal1SK8RJYgQas9L7sZLRGeD0g&s=10", // Antonio Sanabria

    // --- Australia (AUS) ---
    "AUS-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wp_f54RoNBI3gAk2Cann4TYKvZ7lzIY-Ng4_6Rztmw&s", // Escudo Football Australia
    "AUS-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtpWLySTt5zFARy5cc8HHqsFvelaBrZ2Yzztxn3V13UQ&s=10", // Mathew Ryan
    "AUS-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMAUu5_bfkguE2YndacxSEAs-0xxNqNVmfVnVjOwc7-w&s=10", // Lewis Miller
    "AUS-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxgw27nZwevYy1O7xHHDWM6smhumbDmjulRBxzmZp_Mg&s", // Harry Souttar
    "AUS-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6dAtrCnqiYZ1cfttM8Ia5qgNe6Z2RkRNHQuRZd2ChA&s=10", // Kye Rowles
    "AUS-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGldgHStiLWS4GaXs2DG83rfy_-dZgqWoSpPxKFZLBmw&s", // Aziz Behich
    "AUS-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3HRQZWVZisO2oliie9DZ-i0_7aDEx6KKE9Mlqhyyug&s", // Jackson Irvine
    "AUS-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX3Ceu2yn3ECkD5Chsp4bUHLlolFFa_p9vHPY_CiowOw&s=10", // Keanu Baccus
    "AUS-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeLw7xJfzIy62wt-Pwf0bZplNce_OHby05KIS92OGGIg&s", // Ajdin Hrustic
    "AUS-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_1Jsyw25RuhhIL29AtKyKRP3CEiZ4jLMuM4OI5cEsvg&s=10", // Craig Goodwin
    "AUS-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLx_TmX6__NF3SZSO4qVGrVi4YXRHtKlUW86uL84MLg&s=10", // Martin Boyle
    "AUS-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0dqclbeyQEKjQj4SiohGOz4RHACjRFrlc6SZH8yyiKg&s=10", // Mitch Duke

    // --- Turquía (TUR) ---
    "TUR-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbynMeRkiDa52llEV-Jw0N3-pGtr5-pzbbYfl2k9tMuw&s=10", // Escudo TFF
    "TUR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAF6E34R9uR8YKU-AVLhuOAlW5QMHGyZh1iyOBgYj7fQ&s=10", // Mert Günok
    "TUR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2CcjlMsfT4NvESj_DGhaA5jpBHM_x-qNUV4l7RoXb8g&s=10", // Mert Müldür
    "TUR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3oxyiEm74ipVGrrkrpgyH2YQEwQaW5SIW5C4tIxmrg&s=10", // Samet Akaydin
    "TUR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-msQqZNu5JIOU5wVUcZR5stJlSXTnRICEuIHqSQYFjw&s", // Abdülkerim Bardakcı
    "TUR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnupjBgUXJVus1ICH6Rxpt5Wu2t2QCCa_ir7Dqo87DvQ&s=10", // Ferdi Kadıoğlu
    "TUR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwQO8qcoN-4rSBal8nFX0xQNYeztDadonvXYLv4p-aQ&s=10", // Hakan Çalhanoğlu
    "TUR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPJKIJShIUuy0IaGYlTjVSA9ctA8I4B8P8Hdp7ies-w&s=10", // Kaan Ayhan
    "TUR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDiZ3WmPvL7Rbr1mxGKkBPVyvMtv9s7Hg67JJGui9qg&s", // Arda Güler
    "TUR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpKQ3koHkmbSMpLvLy_XgyNQ8r7o6k9exPqL14gvWS4Q&s=10", // Kenan Yıldız
    "TUR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4oq-UHUxcaELohXyuDrv4NnJzaKsTrK9Lpnqq33xxA&s", // Barış Alper Yılmaz
    "TUR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP81L7nx_UEXfddKdET6rKLMxCcjvdCsozOUvh-ahn3A&s=10", // Cenk Tosun

    // --- Alemania (GER) ---
    "GER-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXAl9t-rK7sd3KN8494U8WGFBU-cD3eMm9poJBWBQOpg&s=10", // Escudo DFB
    "GER-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeCCGON7DbpgvjQn4UrkSwB4zrdJuq6dnENAe0qc_OHg&s", // Manuel Neuer
    "GER-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYY9sKjaAa-zS06c_o4vyGPhHf0S4Xi4jehcN7ThmRYQ&s", // Joshua Kimmich
    "GER-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2fp8_NgvZRX6yF2W3tze98LcqUGxmFIO_NVxsvI1Rw&s", // Antonio Rüdiger
    "GER-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVb_jUKIkH8vCRx4_sOojgbmqhNcJZesABZpBaUPbZA&s", // Jonathan Tah
    "GER-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fmPBWJrtAgNwUuonvtmighHSo0Db4-IG-jrDKwI0rQ&s=10", // David Raum
    "GER-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTChwqk3SD28wFr2HgZqbD7J4GDKjJhop8No0x0ti9bw&s", // Toni Kroos
    "GER-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR220yMqmq9-6nUmsf-N2BBAu8RrXz2WmBGiVi6ovr1xw&s=10", // Ilkay Gündogan
    "GER-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQk4BhEeUQ92WvbWBrFZS8I28AC0FbG85IVAh9N2ohEA&s", // Jamal Musiala
    "GER-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6drAbDCYJNR7UUAqKajEVqP1LpVJTYBFR87tBJfc8Zg&s", // Florian Wirtz
    "GER-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWw0OdhesSS1Kk4DuPB8vQfqDbKMYWMP5W3lKHB0wYTw&s=10", // Leroy Sané
    "GER-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wRIybXkrhkSjXxzP7NI7oOiJ5KrlGppqIF1itHk4aA&s=10", // Kai Havertz

    // --- Curazao (CUW) ---
    "CUW-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbotW7pvnCOIBuWy_PRLVjy6SZQlI7sTgjcBxzZXlvcw&s=10", // Escudo FFK
    "CUW-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ74mkLeWo5H_No-6S2qdfk-2ZDQmiQlGl3q5FSB_RmHA&s=10", // Eloy Room
    "CUW-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO4Yh5KJn-OrETxME47bNo2rluyae39_nYMQejVXeFXQ&s=10", // Cuco Martina
    "CUW-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaezkmBUZY0rFBua6t5epoPEahKAsJjlSGg51-VeAEA&s", // Roshon van Eijma
    "CUW-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQuL8Ml9wAnd8M4OXgZjPv0iHY3YXJWjetNB8L_EG3w&s=10", // Justin Ogenia
    "CUW-6": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Sherel_Floranus_at_Antalyaspor_vs_Fatih_Karag%C3%BCmr%C3%BCk_SK_20220213.jpg", // Sherel Floranus
    "CUW-7": "https://upload.wikimedia.org/wikipedia/commons/8/85/Leandro_Bacuna.jpg", // Leandro Bacuna
    "CUW-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6XinJ-hzK2Te0MIUgB7VxKe6GTOB6i8Oa1evp83MBvw&s=10", // Juninho Bacuna
    "CUW-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ47fehnu3NJWpKOLyAdtXouHHr3uR2SBZVp3Z27hMUgQ&s=10", // Vurnon Anita
    "CUW-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZnPvVsCm-eJu81yYOo2Lz6RJgW4HLolTIFyKfTvuNWQ&s=10", // Rangelo Janga
    "CUW-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5juELGLNPQ2FHBrYe3zSdNvjOzuRl-ezAkdAT8GdcvQ&s=10", // Kenji Gorré
    "CUW-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qMg8m7TXgfbm-2UR3ARktUdpwQY2z6JyoVNlbrS3HQ&s=10", // Jarchinio Antonia

    // --- Costa de Marfil (CIV) ---
    "CIV-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRukZSA0ba0wy9jST8u915lT7cmXNnABdmM849vx02QA&s=10", // Escudo FIF
    "CIV-2": "https://es.wikipedia.org/wiki/Yahia_Fofana", // Yahia Fofana
    "CIV-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeclYY-YsgOyLN2Ap9C6L8yQCb7AlkA_a8l_wBmkFiQA&s", // Wilfried Singo
    "CIV-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0P7-r_IEJwQLOyqGk0gBxSHplkOTdi88Cwl9lQR50EA&s", // Odilon Kossounou
    "CIV-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpGDranYg1w8LLsA04ncOoWMDcCBYtS-Dyxzk-ugqfNg&s=10", // Evan Ndicka
    "CIV-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqI2Llxud742iY0_QshVxhbRY42hDjvpdrJEIQRNYZGg&s", // Ghislain Konan
    "CIV-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeWvXS6boaCJAT7wNl1CuljLrQAQPlY34c4UFgc-FJAg&s", // Franck Kessié
    "CIV-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnG-EncgkA8Vogw8zyGUP9__5Pk4rz_twGc7oYO2Zqg&s", // Ibrahim Sangaré
    "CIV-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqufW95SC2a7TIGB7puDhmscQwuh-PSxkRwLEM78c6aA&s", // Seko Fofana
    "CIV-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLNSf-5Gg4OH_Yv5YI8uiGtDu9DrxW73gjUoIHGM3mA&s", // Simon Adingra
    "CIV-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdFU1DM3LD8534LRE6qEwqIaaNR0RpZseWP0uGroKNmg&s=10", // Sébastien Haller
    "CIV-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoSgYzXiz_K44EgbovSTo5Is8M3qwjXFDJ-NGrdsyrQ&s", // Nicolas Pépé

    // --- Ecuador (ECU) ---
    "ECU-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdf3W3aJKLUR8EJRf6y2TCR6NAWDuh3ozV4xq9Dt_bjw&s", // Escudo FEF
    "ECU-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZxLCh-wszpPfKh5y9qUOSIbvGejgzUfSfO9H7iQiSRg&s", // Hernán Galíndez
    "ECU-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrdXpSrMaqQhbJhHRHii1wKHzB_8B8oQsmhi34ZWAuA&s", // Angelo Preciado
    "ECU-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzIaao5pgyl24aD3nka-tcBVNtG_zzzNhbHePmHMK7w&s", // Félix Torres
    "ECU-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgknE9TtbtI6sOT61BDId7ql2-qnMJQUzE_8fyDH5vw&s", // Willian Pacho
    "ECU-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQIQKluo8Bs_IGImZ9AwgttPg9PWxXoHIlyk1b9SSq-g&s", // Piero Hincapié
    "ECU-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1gk5hfRJ7EHBwx5rOSsYSC3L3JAq1zcPqX-X1_wxRLQ&s", // Moisés Caicedo
    "ECU-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7Kc4CiROLHn8S2JsYrdk21x_H5-OUoLEM19AU6qxMQ&s", // Alan Franco
    "ECU-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiQCYFCZ7Mqn3ISY8blFTyKlMszCDLbfObj0LNbPwr9g&s", // Kendry Páez
    "ECU-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQ8m5y9vMAm1XxGtA8hl1E1VdVklpA_zS12ah9AsuAA&s", // Enner Valencia
    "ECU-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKX-mxASk4zU3Rn8VkrV30LiRE2aF0rnDSSD0dqTgOwg&s=10", // Jeremy Sarmiento
    "ECU-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_l1UG93PrshcFK0xqx379SJHPKLP_XYPufz4XQcg4-A&s", // Kevin Rodríguez

    // --- Países Bajos (NED) ---
    "NED-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1WwW9OVh_Xpwo2BVv96hOiYNEBzI4FgEmwLWxSyQVxQ&s", // Escudo KNVB
    "NED-2": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Bart_Verbruggen.png", // Bart Verbruggen
    "NED-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLWxwKbBlcCHODTiS2EwqdAfMwri-ZUWjVLeWB3maegA&s", // Denzel Dumfries
    "NED-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDoWV-U4187nADVHefYbm1j2rkLyfyERRPmnH6bZGtg&s", // Virgil van Dijk
    "NED-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf63m2C7K_4G_2Enj3LQdWpl9Qq0UEX1QLR5CZZib4eA&s", // Nathan Aké
    "NED-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhI5Uf1VG9Tlm_h2i0AlfKucrfgBrnYcRlP9u1ZQhEsw&s=10", // Micky van de Ven
    "NED-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbw_RBEQP_BleCm3p1KXmCOLHlYgHnE-BNRXVRi31IeQ&s=10", // Tijjani Reijnders
    "NED-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROLivyv47OTJ63prTvch5ioB2lZZqE1tNtmTlnZluQDg&s=10", // Jerdy Schouten
    "NED-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ3nqssxMqnkv0TImw9XGrExiSL8NcnQWTvp1yvmIevg&s=10", // Xavi Simons
    "NED-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Y9gRxHONoIcNm_aR195nvKE0wPrVPkf7gPLtGMCgcg&s=10", // Cody Gakpo
    "NED-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZqW3iwAmpUF3a7xph9AORjXHhd9tFkISsnDdw5G2Ntg&s", // Memphis Depay
    "NED-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnL8mTNNiID-t4GyfKXOs3MEl4na4OvW_svn027_E3Og&s=10", // Donyell Malen

    // --- Japón (JPN) ---
    "JPN-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kP08Np4x0lx-MjayFVcUP5PKN95hgTCwKb6RO5mk7A&s=10", // Escudo JFA
    "JPN-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsrEkcB2n_LwsZQKajARKq3QrdtYaoSaIL029fDaVHAA&s=10", // Zion Suzuki
    "JPN-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKg7MdjvshVibTFF9_Y0FbUFLLH8Ked2F2_MDMjz9mLw&s=10", // Yukinari Sugawara
    "JPN-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTekq2edqNPedM6zajbsAfTqUGI0pw9MJY1-fJk6Gcog&s=10", // Ko Itakura
    "JPN-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQceTLTLOKxXSiIMPtvQZypqIgKkN4KXxlPBjFVHq9G8Q&s=10", // Takehiro Tomiyasu
    "JPN-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_LoD6a_bPD14LbkJ0fmqHknAnsGHWiYvTpJRTxyizA&s=10", // Yuto Nagatomo
    "JPN-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS37ruMK5EJiQPl97e3fAKZxxPM5UHPvc1mNHi40DMrg&s=10", // Wataru Endo
    "JPN-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJUGWEcRMJWJ6bLWBJp9tsYO7NtGugvBKM3tSoGQG9Ag&s=10", // Hidemasa Morita
    "JPN-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDULOHdHhijl5not2sgm3ptFK2tIlrtPJlW1CYPNCNhg&s=10", // Takefusa Kubo
    "JPN-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBrIyQqIooYL4XShqQwbTjYzy8g-PRbmQh0TJxldFwg&s=10", // Kaoru Mitoma
    "JPN-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKMAIldYTnBUr1FOaa3UBgClzN-ZMGRkg8uY3aASr3g&s=10", // Takumi Minamino
    "JPN-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNzzA9qiV86GWQyjT3o37xvLHcWFAjmdwFt6se0fcQsg&s=10", // Ayase Ueda

    // --- Suecia (SWE) ---
    "SWE-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDSu9ZZ5SgCOMfLbZkY7lGXFJ8CGZ_dFFdIX1BEql-9g&s=10", // Escudo SvFF
    "SWE-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-n6PhKxz-h47kv-lDBuDkz5xVc8BdiZoHiWhjcwZJPw&s=10", // Robin Olsen
    "SWE-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMBfuLS7y3dKr_LSx_gHLQOV0zYuPKfAqvTepxfoOhw&s=10", // Emil Holm
    "SWE-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmK4qcAjxpK45ClwgQizljhACcMGjCMLmNKqHe9uKcw&s=10", // Victor Lindelöf
    "SWE-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm6g6LYAVLmBshcdLhi6ro2meEougMy-P5Bh8A3Tv5qw&s", // Isak Hien
    "SWE-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdtQP9UwtQPgTaFgBscywRaRFMtjormJgBqkIs-VaEg&s=10", // Ludwig Augustinsson
    "SWE-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqY1ZiyRN1vr7NOMbjAdOhxLka-5B7uhSOqUkDli7H_g&s=10", // Jens Cajuste
    "SWE-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeVk7Gql0-XeZ-XX9LKv_D-GxcjWuAmHZhjIjWDbidnN4MtLUe0bR24E4&s=10", // Hugo Larsson
    "SWE-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg03ufOznQuWICNHV8rzKfF8TWzL3CqFS25BLCiG6OQA&s=10", // Dejan Kulusevski
    "SWE-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnwGvUTHijPrjQdlUBP90Ak9XdNRoFmGyST3w7oB0Dbg&s", // Alexander Isak
    "SWE-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpS-m24wRbtBKA7_-MoTSorGCFHZ7G-vV1lBkxik5xA&s=10", // Viktor Gyökeres
    "SWE-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh0aaJKIERezmRbzIMdIeHQBJK1D8R13bMNTcIGtEUAQ&s=10", // Anthony Elanga

    // --- Túnez (TUN) ---
    "TUN-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYo2kLvmJru3dhNG0TzIgDUT4yHsw0pVhCTW5hNrb5CA&s=10", // Escudo FTF
    "TUN-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJOitffFF4IoSrcmgdzfzPofux5AFJT7JHifbtyiR5jQ&s=10", // Bechir Ben Saïd
    "TUN-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mwJuOkjnhhV9P9QAiogIoO3YaCSP9eVxujuSwmKBYQ&s=10", // Yan Valery
    "TUN-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV1tCijHwuswjqu6wPadXp-u3FbOYXLv69Fy3OZeNbyQ&s=10", // Yassine Meriah
    "TUN-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEW5i0DrdFkRZngZj4xyAc9Q6WfkDI_KggqV9j9dLOJw&s=10", // Montassar Talbi
    "TUN-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzVplTWXVLZKIu3xw9TJkAgo_Kws3mxJwCqiV0pakIQ&s=10", // Ali Abdi
    "TUN-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLUVe3yhz9XICxJKh8zcLysa1Iolbfjw6gX1ocEC9kg&s=10", // Ellyes Skhiri
    "TUN-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYm8s_RdPNMsFhMIbEeIJUC7RzZ7bSauph3VW2nqAB9g&s=10", // Aïssa Laïdouni
    "TUN-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrTkE5ZAx13umt8jHqee4POjr1LPipBhOdnZu73elakQ&s=10", // Mohamed Ali Ben Romdhane
    "TUN-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEykmgYxrIGCXWTtyeQ7eGBBtFCtC68AH8BvcKHICNKg&s=10", // Youssef Msakni
    "TUN-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQOWaL00isGpAega4vQEoZsnIXGKznzjrRZTR4OhAcg&s", // Elias Achouri
    "TUN-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqIvjueT6JtmeshFLXO9_twpDg8WFzRnUTQorJl-o7g&s", // Seifeddine Jaziri

    // --- Bélgica (BEL) ---
    "BEL-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKn39ZnkAithJZ1NYZGRpX8yzFcUOAIfMwRuwGaE4KUQ&s=10", // Escudo RBFA
    "BEL-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9UxzRG_Fbfbky-WZ7gaCaZ7U-HNAH606fOhuUuzLqlw&s=10", // Koen Casteels
    "BEL-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaz32BDn75t_0e5IoRLiJSaVCCJdXXXXrbZRBE5Rj6HA&s=10", // Timothy Castagne
    "BEL-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6IdalEqACaYecnRXn8YXroe879cm3ChEVILgp6Nt5HA&s=10", // Wout Faes
    "BEL-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdKqwHd37jDthaGVy5rZOwiBDPYBsYh2U77r8NH12kA&s=10", // Jan Vertonghen
    "BEL-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQf7JWGufcwbb-A-o5GDR_n5O7gzeHVOJ6dau34JAmVw&s=10", // Arthur Theate
    "BEL-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfVaLFfCCGW2q0fs3X6EFX0sn_T5qhXLgtMo-KnkeWtQ&s", // Kevin De Bruyne
    "BEL-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1kazD_eD4pkHIGlb0_lPGMptglxT7a8CkzPj0riWbZw&s=10", // Amadou Onana
    "BEL-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6KfnklLzItL-Rhf-7JgeBH-YdbCXUqBrcS0B85GLGQ&s=10", // Youri Tielemans
    "BEL-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxc1uf2ezG-CpD6SR7_JXvHY0EBh4UO_QV2KuX8bOlQ&s=10", // Romelu Lukaku
    "BEL-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfEFmZXIC0BOuZvBd3pLogny4Ya0-wuScDmTwxUAZ3XA&s=10", // Jérémy Doku
    "BEL-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjpU44WQpcPCISITKUtKRKsCj5UpJU7opDuXsAmO0uMQ&s=10", // Leandro Trossard

    // --- Egipto (EGY) ---
    "EGY-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOogBYDOiJ5EvFKLXyT_t4ExlAe4nF51MxCUNe2YCbUg&s", // Escudo EFA
    "EGY-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rpoaGcBd-bV2Zg6q_QL1llblUhjs0aYb4-g_oknbaw&s=10", // Mohamed El Shenawy
    "EGY-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWTwRQKGscw5OSEkwp5LXp8BWNVA6z353jq5VUf4o4bg&s=10", // Mohamed Hany
    "EGY-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkF4p-DgwmATWnVZMG6dKEbt-AMuRDBcvlpUzR6SkPyA&s=10", // Ahmed Hegazi
    "EGY-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkck0C0Yo5sz07otU34cTIb4kAlF91hYdKiwCk1Iz0FA&s=10", // Mohamed Abdelmonem
    "EGY-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzp7qf_WxKo_nDEERJyREcYEtDMjN8oB15zsjOMvX7eA&s=10", // Mohamed Hamdy
    "EGY-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_yZaTXS1TVyDNQk8RLZmfv-j-4oYSekJGmC5E2r8iA&s", // Hamdy Fathy
    "EGY-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0DOq2iMQYEwfEGEXiUl_1amppjUZhnbl5LTcd1uN2PQ&s=10", // Elneny
    "EGY-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOqAaY9Y4rfJFesKSrb-a_1iNeEUUNlF9VPDy9acPZg&s=10", // Zizo
    "EGY-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESg_qZGursQTuAxk96MtlOFbl-3zXvU-FEOWtsZk6_Q&s", // Mohamed Salah
    "EGY-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26nua_bed-KzyYmMKecuig72hsBsG9X_-WHlpKuMUzg&s=10", // Mostafa Mohamed
    "EGY-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPs0x_D4kJPPdc5FdL8OXlwlH3hdg9BxtaS0SfhPjXg&s=10", // Omar Marmoush

    // --- Irán (IRN) ---
    "IRN-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX04lP7EL57EdVsfwrz6xu-J72PqpI7d7dXK8MyKvHXg&s=10", // Escudo FFIRI
    "IRN-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEANZ_Jz2JLrkeFso9z7tLo_iQrI2FPLucrouLodackQ&s=10", // Alireza Beiranvand
    "IRN-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShAsJnEmt8xRFaq-JWnsO7NPTxbq_y4_SgpPp7hvvBDQ&s=10", // Ramin Rezaeian
    "IRN-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YLF19Fz2FWKr6WjJDQtMQM8_wylJzmard_CPl4q6gw&s=10", // Hossein Kanaani
    "IRN-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xrO10Ptl1ZOhXgOX8v0FskfjoxKjCIRO5nAPGENYRQ&s", // Shojae Khalilzadeh
    "IRN-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6FhvPLDEvONnEhmYFwu3_Im3Yd2w0z2kZW7oOW6Z4sw&s=10", // Ehsan Hajsafi
    "IRN-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNvx7ZqkkOZC2UVcwmNZaTQ4_1b53LacrHS50brjlorA&s=10", // Saeid Ezatolahi
    "IRN-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR082UmhIwbOls48lYx0lh1qiJwOaJFeoHv0me2IcC52Q&s=10", // Saman Ghoddos
    "IRN-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCkl-HMKgIH07dnfUvYVWRiX8aQneem-BJ8ml_kCdXQ&s=10", // Alireza Jahanbakhsh
    "IRN-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKvld95AbPwCJpjAP9QUsqIGaPsC2LwV-9m_bJHBj-Jw&s=10", // Mehdi Taremi
    "IRN-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL77SLaliHdhpidkNNcozBrfPRo-SQ_uJL1CMSPCBOcg&s=10", // Sardar Azmoun
    "IRN-12": "https://cdn-img.staticzz.com/img/planteis/489/7374489_.png", // Ali Gholizadeh

    // --- Nueva Zelanda (NZL) ---
    "NZL-1": "https://www.futbox.com/img/v1/e7b/68a/56d/7cd/5839b6c51917eadcdebf_zoom.png", // Escudo NZF
    "NZL-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFNCUL7-Jy6rAlZI9X0lKI_QBzJPKSvlmNj9BzaECQw&s=10", // Max Crocombe
    "NZL-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmISxnM_7VWLjPTuB5VFOOB_komkZ3tEAfT5KeJjcBcA&s", // Tim Payne
    "NZL-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSoSKo1Uwljydg2RttuvdN34D9pr9wQl8wT14hYKHEaA&s=10", // Michael Boxall
    "NZL-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_koSpAjH6V9jvjqsE_rDZGZxh4XJFVT94uVKaD3cZwA&s=10", // Tyler Bindon
    "NZL-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFWquAVh1yyLjLfbN-reDMZgQqOX7_mF-La5P0sySGg&s", // Liberato Cacace
    "NZL-7": "https://gbaike-image.cdn.bcebos.com/fd039245d688d43f87943dfe6043c51b0ef41bd58d30/fd039245d688d43f87943dfe6043c51b0ef41bd58d30_3_4?x-bce-process=image/format,f_auto", // Joe Bell
    "NZL-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJv4xQDS9RGbmEAvC-A0HIwDHNm5tPiDu8EjK4CcrcQ&s=10", // Mark Marko Stamenic
    "NZL-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiuXxuHHDq2Dn5OY9i19ehy4O8-aRcDrTD4YBRY7bU9A&s", // Sarpreet Singh
    "NZL-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtx-Xi261wQNF28UT9HVFPYo4dsbAv668o5GresE_qOQ&s=10", // Chris Wood
    "NZL-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnCRHSY2Z4FXk9Om03DK-M-78d65yvHT_zFjBJ28bdXA&s=10", // Kosta Barbarouses
    "NZL-12": "https://assets.bundesliga.com/player/dfl-obj-j01hco-dfl-clu-j000hj-dfl-sea-0001ka.png", // Ben Waine

    // --- España (ESP) ---
    "ESP-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6C8YAsCJ7CMcoZAkpl5JzVIGU9mSoY_9A6gI-sb60iA&s=10", // Escudo RFEF
    "ESP-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqM_fQpLA_t-WtncjoZrbuwWI2kABvYgLGPz1zJch_tA&s", // Unai Simón
    "ESP-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBbb9K7nnGRDOyRKrvClqiAIFnR6Lb_g8Qo92jbwABjg&s=10", // Dani Carvajal
    "ESP-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIBZG2dxV4B6MVgpz3WHICow6wlXC653sC8e8RYWl1Hixkm0w7Bx9EjCI&s=10", // Robin Le Normand
    "ESP-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6s_Q6i3NWhL7udYlXHdX7ZhUZYuxGFo4LPjNnMFXySA&s", // Aymeric Laporte
    "ESP-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCPOFOKbuZes-anrSgGYIBFJ4-hzgLNOMxL1CUKo6L8EBSbLol-x1VAZk&s=10", // Marc Cucurella
    "ESP-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsVI5rOdHvMM6EguglZi3Ncl5kv1l8gOrjq2uYlpvSYA&s", // Rodri Hernández
    "ESP-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdH7QK3HlSu4ybS46BEU5wt6Boc_YgahrO_BIjGeUhyQ&s", // Pedri González
    "ESP-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDuI1Xy96DYXOO56LJT-L1J-aTqroaTTUQ7T1YlSktg&s=10", // Gavi
    "ESP-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6U_QZswsCDSqx8XJR26lzBUSmKbAC1RZ8N7Fwi9YdQ&s", // Lamine Yamal
    "ESP-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGS9Nhh-sM0q-P0SDLbqTJiJe6QUDWKnuXt99vxS3SAQ&s=10", // Nico Williams
    "ESP-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpehIRU7850TV2DaRgLHnnn6P-ZX31x1fxoA5MTF_nQQ&s=10", // Álvaro Morata

    // --- Cabo Verde (CPV) ---
    "CPV-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXO5JsbQLc3Zd_h_tGKP3GbVMi5eaY-AzcuK4ngzyAkA&s=10", // Escudo FCF
    "CPV-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-qPBDpGOyHl5Mqf6QtZhjDp5iRLbKLpS4d0h2WdL1A&s=10", // Vozinha
    "CPV-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGh6Sh52ru5zQalduefqkHmQGnBEL3saXqGp7nSiffw&s", // Steven Moreira
    "CPV-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-LPhwPIsW76dpTpqCTOCoz3yKlR39J2YCxcm4xUlMA&s=10", // Logan Costa
    "CPV-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4e5rLdjHH_CQckGDz84g_BkOIW-SM7u5O5KldCXaFA&s=10", // Roberto Lopes
    "CPV-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLLXbeElSDlI0BQFVkS7q2mlLpIcT5Q5e95c3pwPmdvw&s", // Joao Paulo Fernandes
    "CPV-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGEkLRcBr61v7T5G3QQnSAr7ohEaKMrLtVew1HiyTWww&s=10", // Jamiro Monteiro
    "CPV-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOvdnEZUcHzvmRCO8jsajO06GTyCMKLQkCkqbKUsH5GA&s=10", // Kevin Pina
    "CPV-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVyFPMBQqYl62T7uBTFBdOaANRqX-ppfnoQk5kOALwEA&s=10", // Deroy Duarte
    "CPV-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScRMrH874x7fjAFURc758VDX9XoDIE14_33Oj9-d8Llw&s=10", // Ryan Mendes
    "CPV-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMLL83WnL1TNyFuaFUnpL4jRqM0dWjbvzKNLiURPVvw&s=10", // Bebé
    "CPV-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8HOJ7xxugpuSc1hZ7fhCuRGHcnXHA4SHq3LbMkM9JSw&s=10", // Garry Rodrigues

    // --- Arabia Saudí (KSA) ---
    "KSA-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp-mqA8_pYO5Vn-pm1XSZXS96-V4pDIddq1dawOFLpRw&s", // Escudo SAFF
    "KSA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqcY742J8zH_33CQEtlBTyMrfS2S0nI5RzAT9lA0O4g&s=10", // Mohammed Al-Owais
    "KSA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDPYFUiaOVreGTEHen3vZXWMWRi1EJdvWmO-IOiKkMZA&s=10", // Sultan Al-Ghannam
    "KSA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmd_xwS3F04z3HtwMlZoK-k79WZeW6xR-zHypDee4PmA&s=10", // Ali Al-Bulaihi
    "KSA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsx-N7c0AjSoOa3HegrGxsUxyGgxG6-7iKiB5DBc1Qqg&s=10", // Hassan Tambakti
    "KSA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQW8hLjPjUg37J9bhRohCachjXvuV5ksnjUnbI7RXKrg&s=10", // Yasser Al-Shahrani
    "KSA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHmXQiaQQ_p7EJhnrGgRrt1JcsfCIIcOOXVKLyTUcekw&s=10", // Mohamed Kanno
    "KSA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZ4p9Iaqln1DDFD5FMRYEJx84mTFXguVdwQ2WTQs1rg&s=10", // Abdulelah Al-Malki
    "KSA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJQZ1ll6psEhJBUAZzxTBZlbAwAPcxiXmfafKgWNsXig&s=10", // Salem Al-Dawsari
    "KSA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsaOBQnOQFzVYeyTbiiBqTkxXgx47UhU5ogp4CE5lsLA&s=10", // Firas Al-Buraikan
    "KSA-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4NxXsXJysI0H_xPjRxUQBpb1mXb53qiKp0zGyZ2jX4w&s=10", // Saleh Al-Shehri
    "KSA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4CrFkmpyNc8YhqapAhtoLifL-wqG_ia_ENy7gnsvpiA&s", // Abdulrahman Ghareeb

    // --- Uruguay (URU) ---
    "URU-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpIdDvy0PfG4RhRxpq-bfTHh5TwApSBnSXxnpArJd2Q&s=10", // Escudo AUF
    "URU-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXlXD-fs5Lk4RvMGe_RgX9L1Pia9Z8nBj419KYY2vOQ&s=10", // Sergio Rochet
    "URU-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4E_W06HO_P_FysvKKmuBKH0t1TWfULwdREW81uZBGQQ&s=10", // Nahitan Nández
    "URU-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1HzgKx6PndkljLJw2mGcajjjqjhuzyeyol3fCUF_Ig&s", // Ronald Araújo
    "URU-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDMcOhDiW0zQlS_uwpyydtVvicpm3LkN25AhPE7K5XQ&s=10", // José María Giménez
    "URU-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT273ObUIGjVgQTOpUjOR3KvsjjlNH_3gOiqwbmTjRgEA&s=10", // Mathías Olivera
    "URU-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sBWIRnX5nSVcQqJBPSRVQxxGI8D9PMGmbIx3qmxklw&s=10", // Federico Valverde
    "URU-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZIouZboYoyWPICKy_nDCB7yHXvMuq0R7znLK3Q3vbbA&s=10", // Manuel Ugarte
    "URU-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNABDUicmppeNXI8RWup7CqA8aI3lPwWbKRL54GF1Gzw&s=10", // Nicolas de la Cruz
    "URU-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8WTvkcdPgdlB1LKJILcLLzzCs79RNmPVGR7Sc47QCuw&s=10", // Darwin Núñez
    "URU-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpdiI2RQZRZtWfgClBk7LNsYKhEx8MUZ-vn9QghsTLQg&s=10", // Facundo Pellistri
    "URU-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToLUKfsA67HCuaTlKP7-UeYyzb-wl3K3r6w2-Xt22mdg&s=10", // Maximilliano Araújo

    // --- Francia (FRA) ---
    "FRA-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSALpMHtXRcYqhdWaBS4PFGyfjt1KHeFWQ5AwLMnYVsIg&s=10", // Escudo FFF
    "FRA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS__3zEmwYYCVMBmj2usVbqXvbSPF9HLSi54dbqlj5zA&s=10", // Mike Maignan
    "FRA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTDTq-Cz4pKM634PHLj9YZYvNbF2rWMb7QI4bqi3Zog&s", // Jules Koundé
    "FRA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtIDtJriCP7vN0AgDRJ4-m5fFuJITdBRctW5xLjib1eg&s=10", // William Saliba
    "FRA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTzJEdyK4znuxhW8HrK8KH0uioqj6J6Jfs3v77KyE6CQ&s", // Dayot Upamecano
    "FRA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirBEEUYLCz1JGGs_bsJFBkTA1ehopNgAwviTO6dhYjA&s", // Theo Hernández
    "FRA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZZEF3jF34ADz66hdyFJKScCD4jJytjGKIphJedHXXw&s=10", // Aurelien Tchouaméni
    "FRA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndHpNHm4ZnRvHJUilr5XtVQ-_2cw54Tkc-8rAecwTRw&s=10", // Eduardo Camavinga
    "FRA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF9rlXHdZdCpA8iBizIto5UNWr6hjy63n5FBbRGQpa6Q&s=10", // Antoine Griezmann
    "FRA-10": "https://x.com/SemperFiMessi/status/2024160029482299404", // Kylian Mbappé
    "FRA-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCKI276SQu0aprf3i8CO3I9lrSFk8x7CQjheLgHYktA&s", // Ousmane Dembélé
    "FRA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbsLIXK0xw2SvHKkPrsHIjke6GgJmx4-s9eB2EvY-oCg&s=10", // Marcus Thuram

    // --- Noruega (NOR) ---
    "NOR-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVgDR5NmZRB7d-s2d8Q3c9bDM3E7RhpppZNhjqXvIy-A&s", // Escudo NFF
    "NOR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQblV3T7sZiIiQYCfE9nQ-FlsnUtxpyMgsyB0tfKDvZHw&s", // Ørjan Nyland
    "NOR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFzm6agTq-YN8SxwRtp8YyV5CJfaTqGezb-TPVTBYT1A&s=10", // Julian Ryerson
    "NOR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfRYsJ5Q7OUIB-Zvaipnv5n0UxNthYhT8D3AzRNICaXA&s", // Leo Østigård
    "NOR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDcp56bve64g7dLzh8MuLGwIIekfpKe6w-ZmLPR4ic9Q&s=10", // Kristoffer Ajer
    "NOR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaAAgsCapXdC4ZdMCc3oNYR2PeVUL4Gz9YIYgRi7qf5Q&s", // David Møller Wolfe
    "NOR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDz4YRC7WEt7E4Ay3lhdiYzeAvN5x_DAcylxry79nRtw&s", // Martin Ødegaard
    "NOR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1PZVQFp_r6nkhSiR1OPf3RkBfuY3kyJOGQ6jg2m1x3A&s", // Sander Berge
    "NOR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzzuQ65ltkGLsyhhOob2q3U0VCzbQKP-xicQpJobFEA&s", // Oscar Bobb
    "NOR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMXggQEC2sDCpxmaGS_-dg71Hu2-5tJuXSWVSUDr8ouw&s", // Erling Haaland
    "NOR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMf1vs7dXvmtRVL1pXoD5WXJgfJ5f8JWjpBidj9hnoUg&s", // Alexander Sørloth
    "NOR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1n_qbie-kirjJiqnQ8wWHJ1ii6sjmlV4ZBAXfhBSLQ&s", // Jørgen Strand Larsen

    // --- Senegal (SEN) ---
    "SEN-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMwhY7jG7fD_Z2T_TzxoQXtAVBTeHm9rMzgW7gRVRqA&s=10", // Escudo FSF
    "SEN-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQhdc9e_gxEsNOUUXHBIv0FkOG6TV5ItUsSPY9gBUlg&s", // Édouard Mendy
    "SEN-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQltIqGvUdDBHocaUL2haiyJgGgo_hciegDrE77eRERpQ&s", // Formose Mendy
    "SEN-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbiLzAGam5ogt4gNMCU5N39L09Q63wkWY4Dpb5YVtcLQ&s", // Kalidou Koulibaly
    "SEN-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGCf5P4BoXzzZAXYdjat1kcDIfPzBbAlTwK2DLjpDNUg&s", // Moussa Niakhaté
    "SEN-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1UrYpTK40qxPl1pDdokjgVicxrmn9etboIBM5TiQjkw&s", // Ismail Jakobs
    "SEN-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8re0DYEaxTnLhVDFtweLOsZpdK3MpfvnmeGcNSXykGQ&s=10", // Idrissa Gueye
    "SEN-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSE-uGZy2wbdbaeFKlpu2vD52SjvWXaKenpO8nHtQzyQ&s", // Pape Matar Sarr
    "SEN-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOYRfTJCE7ByXB0q69_XRKwVoPLQY8rZMro3F9h5Mlg&s", // Lamine Camara
    "SEN-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyz1HaniYf3dQuxj9gLKvR1uHmg_6Yt1wgG7Gx9p5Biw&s", // Sadio Mané
    "SEN-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtBtTapM2AiMVGhfnhMb5lyXINGTBdHCF92o0-L8_f6A&s", // Ismaïla Sarr
    "SEN-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgo4MiSarYUw-LKtM8pBdAtkRvPT4EUuGmBH7veQCUSA&s", // Nicolas Jackson

    // --- Irak (IRQ) ---
    "IRQ-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt14mE-ykGQ14vBxme8EJE56RERTlgxIG3CRp14Fk5aA&s=10", // Escudo IFA
    "IRQ-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-PUJqq9q0ckKA96KiWv2PNO5jXjos1c4r52QTPe5nA&s=10", // Jalal Hassan
    "IRQ-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpw6MLbrG-3fIDBKE07UbbW4YVkZCHJQRTX1bdNgVmWg&s", // Hussein Ali
    "IRQ-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuvgzUqNrnIOnug_hhpsQ-SBj5PvPseK3oGbaL_oYyA&s=10", // Saad Natiq
    "IRQ-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMczOLv6Jv0rz2MXL6e3me7JiUL3LeBtg4gBHgmY93A&s", // Rebin Sulaka
    "IRQ-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHK-AW9NdpobiIC2g_xpBLVy-13FcWBXUaseDUWLsdQ&s=10", // Merchas Doski
    "IRQ-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQskEyGyIHtzu4icUmwupcRs11SZ021KLkIvXTjxlNiAA&s=10", // Amir Al-Ammari
    "IRQ-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnHmu84Lt7htHwsu4vokLXyupGBBc6Q3tCZkeOW9x9vQ&s=10", // Ibrahim Bayesh
    "IRQ-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD-pmwA0DGriuDgvmQ952RXNe5weiafkJldtyDJhmqnw&s=10", // Zidane Iqbal
    "IRQ-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJimjJS8PsbV3XAtDz9vSEIYtZzlAg6Hplvkpq1Od33w&s=10", // Aymen Hussein
    "IRQ-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbn4ZKlrcwfo42FXxNN6vld7cDMGlZbVrI_6ZW-VCTdg&s=10", // Ali Jasim
    "IRQ-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl1J7BduidPjnOcxsfTSs_-xf1u_pmsbVU3OKwUZZNsQ&s=10", // Mohanad Ali

    // --- Argentina (ARG) ---
    "ARG-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPk8Afvg25lfmYf3f9elPTf89EXDK2s8lIyoYz1F3i4w&s=10", // Escudo AFA
    "ARG-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS302NrLanipqmoUxBgXzsJPPr3OVKx0tk00C2QQi4XNA&s=10", // Emiliano Martínez
    "ARG-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkNOEKhDPWbKoiSZVQQ16-yFGuIUkIFYRCcCppMXqkzw&s", // Nahuel Molina
    "ARG-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ03h1cluL_d4auIapyYMCMTYQwuQ3hG1HtOHeqzb77g&s", // Cristian Romero
    "ARG-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfz0MrhDPX70Un4XI-QNITipkTLi2JG98xh3WZnHIvvw&s", // Nicolas Otamendi
    "ARG-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4ZhA7T0hjiOPB0tDBee9YmwgrQBde4KXr0vg2ObyhA&s", // Nicolas Tagliafico
    "ARG-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZKG3PJBkzTxL2ZL3cF1xK6cfJJA0eF52frrNbMDRjg&s", // Rodrigo De Paul
    "ARG-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm-Ev4BERS_fyhHSUENQWk_ByfGjzb-SZwVIRdgHOJ7w&s", // Alexis Mac Allister
    "ARG-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7G2-VkhWFzjTUQ45WR7VEKlJveX0WTOlDnZLwyG3gw&s", // Enzo Fernández
    "ARG-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd_QxpNvq86pbBmJufKTVVtWFCLpQNSl2Veg8h-0djEA&s", // Lionel Messi
    "ARG-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQlV_6t94TqhIA8cFYOewn9it21wCKoqy6KCzudqCEg&s", // Julian Álvarez
    "ARG-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStHxW46vmgTSDiSf36QC1U_zSGKw-9riCT5mPr_cRpHA&s", // Lautaro Martínez

    // --- Austria (AUT) ---
    "AUT-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1t2GgHjtHEzWFiju7hCnW0-mi6zKmsl_GGjXJvdVe0g&s", // Escudo ÖFB
    "AUT-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxMG4SofZya1aOnoM7BUj5N6emqOacF5oJRnl9Amirg&s=10", // Patrick Pentz
    "AUT-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmNGo2pP3H_8NI1lboeXNL8aXaI4tUpcMhMH2MFnMg&s=10", // Stefan Posch
    "AUT-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR15KzDEOkK-QWDQ-MJt-KMUXrX8kLIVHQJ7u2aTcK_3A&s=10", // Kevin Danso
    "AUT-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Gepq8URViWZIT4Lp3lavBjXIE-Czk54LGarDA48Mnw&s", // Maximilian Wöber
    "AUT-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbxXzOwBILnmlSu6IwDztIj_SX7Bp9DJnAKibWRivl3A&s", // Phillipp Mwene
    "AUT-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdi_CEXyJ2UaT4M969UEq51wkuvUEcL8S8_NnLoEDvqcSCYxj5PdegR2Y&s=10", // Nicolas Seiwald
    "AUT-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppDH3ffnalnsamtW-Ayk4JHVpOSwLbFIEQlWEAOE8Ww&s=10", // Marcel Sabitzer
    "AUT-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXu5opjzaBNaeHFwy6A8DpBVLbV3aUx06RnlvUGK9INQ&s", // Conrad Laimer
    "AUT-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEk1MCxOVIS3D55XuBKG1xjvzOZXRqW0OQbz519n8mg&s", // Christoph Baumgartner
    "AUT-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94B5oz0335jHdxrBiXNNn71fE73FaJLGnPAuivYjNBA&s=10", // Marko Arnautović
    "AUT-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnM-K0e6AhFjWnqtqFetmsrj9KyUoJqFqGy5huUhJjRA&s=10", // Michael Gregoritsch

    // --- Argelia (ALG) ---
    "ALG-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0qwAYHxVIThkoDmv-uviEDTut8znMdiRCal91dBOy0A&s", // Escudo FAF
    "ALG-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjUnKJNjqj4Qf4VeeqM0Q0zLcl0HKhenJsgy02J8bXA&s=10", // Anthony Mandrea
    "ALG-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40dhMsYsDnsVc_kEOVJIK0-dcZWIIV5K7l35rmm7LMQ&s=10", // Youssef Atal
    "ALG-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOC_tYN5fDbobz7XDGAdS63aeeY2LCEY-L05aJimA5mw&s=10", // Aïssa Mandi
    "ALG-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3CTWLzLbdIYBZECkcPa6FlfRow39uh5tDSNf45PnbaA&s=10", // Ramy Bensebaini
    "ALG-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUXP4hmWe-UhFF-D-jkOLKH4_VwaQkqlFJYufWSUMI7Q&s=10", // Rayan Aït-Nouri
    "ALG-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3449diax2Y23rHlNQm7_9VqS9pXHyP0svpG1Y2IQzdA&s=10", // Ismaël Bennacer
    "ALG-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE81eQMT1lY2-yS5lnsf-3hWjfHcTsxxvvxAImLr4ig&s=10", // Ramiz Zerrouki
    "ALG-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5pmUkOaTWOVKLUDo5f99cQmBYzciY2fqGjX65FZGwGg&s=10", // Houssem Aouar
    "ALG-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT47L1-TuYl0bBFNvcZ8FZRZaGNKpd1AKJDYj00MLiOMw&s=10", // Riyad Mahrez
    "ALG-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH310TTXtpgDiXcfMI8UTls-RpaQ50qTbnCw1JpUCXNA&s=10", // Amine Gouiri
    "ALG-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-XEcroQJbZQJ3MSEd9HYnc-hEW4AJYYIyHbLlSk4jKQ&s", // Baghdad Bounedjah

    // --- Jordania (JOR) ---
    "JOR-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgY9p3iZmIvPAEwmJbNsWi24aX6p0vdCsW3FLo4eRikg&s=10", // Escudo JFA
    "JOR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTBQ_tIA8noBFhGf7YT7ZX2ZdiDXGAIt2HC0i2pQpT-A&s=10", // Yazid Abu Layla
    "JOR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJicq4S5dOZtfv1P3Fxos1t58Fayh_pgAC8ZBwgnBmvA&s=10", // Ehsan Haddad
    "JOR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDgD5orb1S4TUUQ_CEpOho0ZagCkVIbsqfqX5-6Q8reQ&s=10", // Yazan Al-Arab
    "JOR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQauUk84JmZyIqvMD2mcqMZ68vLL-sMJmwYq6s5VyRWqg&s=10", // Abdallah Nasib
    "JOR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxYKMP8IJTifWe54gQv7KUNNsM9E6H866EUozeWWNVg&s=10", // Salem Al-Ajalin
    "JOR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx5Ak1NqhWR43mnNTTNY_EM82LJu2ViEglwBV2MEreJA&s=10", // Nizar Al-Rashdan
    "JOR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG9NwqvSNnT4-CDmfoli60D-3l5OTsuJ9SCP3n1fnQfA&s=10", // Noor Al-Rawabdeh
    "JOR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH9Vegqc7QppbbTZYkj9QtS1Ab8o-E1J6iqelkmm_8LQ&s=10", // Ali Olwan
    "JOR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkcm6oOBt3rZp9oGVE7tYhcLp5j-wzxVtIfo5bvvlwHQ&s=10", // Musa Al-Taamari
    "JOR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoicwjQ9t7kxddBLUkX54ZTv3tkhaONxs5bXqV0WPlIg&s=10", // Yazan Al-Naimat
    "JOR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhelEYFUXXBdO6BZzFL4Iz8cPBsMo49a5EpPsy6U3Fw&s=10", // Mahmoud Al-Mardi

    // --- Portugal (POR) ---
    "POR-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzrr97Wlpt01pmPT_D2imrAl5fEhW8PEmhUUuu_JwjKA&s", // Escudo FPF
    "POR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5XDqYpHNRMiIT4yh68AYj_FVVuzaE6CsS1Sz3peSPWw&s", // Diogo Costa
    "POR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw6XdG6Zf9VkbenklyYg5HO2GNs93nXblIwX8aY2F8Ug&s", // Joao Cancelo
    "POR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHe0Z4BT0UVmN3MLGzKOokIfnfO2MI_cEEabDJQGakw&s=10", // Ruben Dias
    "POR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxlHybILNbaKUNFExiKvX_o_Sj-kNVseYelEeQCGM3KA&s=10", // Pepe
    "POR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwcDnhZutxPn8s-xYTnW0CLRcg0IlBEdLtG5BmU7cKZA&s=10", // Nuno Mendes
    "POR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-W2ojkdJXJ1uJQmOaJeVKP6F28r_P8XDkDv4i92Jprw&s=10", // Bruno Fernandes
    "POR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnU-Q5szem7fwN8XsbnRwmqyeHRcIVpD03an9__3xf_g&s=10", // Bernardo Silva
    "POR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD6WgzKBMN7jHduf21V2he2lnDvIpyvJZ7cAAZWrtIlw&s=10", // Vitinha
    "POR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFbNpakvT8QshljJxN5bcTJIWejzhva9LvopZ0GqRBFw&s", // Cristiano Ronaldo
    "POR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Kgtci1ucDFGYC71oJyFx9tl-d72wIGtN3FkFKlm4bw&s=10", // Rafael Leao
    "POR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXi5DdnGCU13Veh3J6-2gPWCK_g-P_JZwr_ct6aRtRAg&s=10", // Joao Félix

    // --- República Democrática del Congo (COD) ---
    "COD-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlrFCuWPyIkVT3SPvOWCtsWTM5UqJUYHgfmpWnPnEoXg&s=10", // Escudo FECOFA
    "COD-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCf10ox_IEEZvR-6UYhB9AOxPdG3g8tdngoIzsupvwVw&s=10", // Lionel Mpasi
    "COD-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuSbg7g7RYlRFjW2rPY8EBLm4xfXGuEYfeneZ7qsfm8g&s=10", // Gédéon Kalulu
    "COD-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS60DoUTNaGh3s-cH9QHpH0s-Vc8uBEcfnO0bUyMyEkDw&s=10", // Chancel Mbemba
    "COD-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJiC7_jIxrtdHkFn8I1J8-CvlqIsHmmfwIZ98eEEDIFoii2ZEz6smwVAk&s=10", // Henoc Inonga Baka
    "COD-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpZHRqTTmAIoiS2H4ELviUQwypPPZGrCzRx59IF8fmgg&s=10", // Arthur Masuaku
    "COD-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUdLAKw5kH1UGoF6aUmaKA47eJpTV3tkFbJNS-LvzxA&s=10", // Samuel Moutoussamy
    "COD-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWJf04FWSlw-haNhuaHfiy0R6RoLdyvyz7B3iCLDg_oA&s", // Charles Pickel
    "COD-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXPAPJqPjbh0g6PzDY-wWcNURdkAUCovxrU1nPGQz-6g&s=10", // Gaël Kakuta
    "COD-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGVXTabXljNym0FxsFxcyTmegKYRfvAWHXJQkWFQK2Ug&s=10", // Cédric Bakambu
    "COD-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHLu1m-LrD7rKsYlsvI9ArOQC313iEp0vOHDlMiC--Q&s=10", // Yoane Wissa
    "COD-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAQR-LRVRXKePKelX1hPh6tHJhIcwl4AMel_khinst9A&s=10", // Meschak Elia

    // --- Uzbekistán (UZB) ---
    "UZB-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGk6vEP7zPTBzhy-VDSxM6__n9wxv8mpFnfYJmp5R0Xw&s", // Escudo UFA
    "UZB-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTzaHcvpBdyxJsHpzCxOu11n_6giRz0eYaZlesmRaj4g&s=10", // Utkir Yusupov
    "UZB-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB3AUZ958wr7J9vuw2290u2TjZKbN0HFUh75fnUtAORA&s=10", // Khojiakbar Alijonov
    "UZB-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtR7_I8boVwzttmEOewQYQacv0cpLg_Xakr5Yi65pPMQ&s=10", // Husniddin Aliqulov
    "UZB-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnMAFoWZ1ORsZy_29_emrcIQ1egOMW1rsPRfcsahLXoA&s=10", // Abdukodir Khusanov
    "UZB-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ67p8yW7nS0u9cGkhHkITIZk95doXpbq2yM60vhOMtA&s=10", // Farrukh Sayfiev
    "UZB-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzJlcmOiMO9lINSlLiK0WpQDZxY_nBDixQRQczZtfxw&s=10", // Otabek Shukurov
    "UZB-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlFhCC9hvMPGc8ErcRU6Q9Wf3_F4kLZPGzeIVNhKbcWg&s=10", // Odiljon Hamrobekov
    "UZB-9": "https://assets.bundesliga.com/player/dfl-obj-j01vb0-dfl-clu-j002y8-dfl-sea-0001ka.png", // Abbosbek Fayzullaev
    "UZB-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Y93gyps-Uiwz9jCBp-FsRJDoNNcGUw-JFQVtKE8gZQ&s=10", // Eldor Shomurodov
    "UZB-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLrr3okTNx6WYsD4d-Ui7CHqhDh9lQ4acjZK_VegG0IA&s=10", // Jaloliddin Masharipov
    "UZB-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaDYk_GA-uQq0pEK0AB28UUAEwXYOrNmhhXW2c2toE7Q&s=10", // Oston Urunov

    // --- Colombia (COL) ---
    "COL-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mq__JFh1Tk3pniyNOOJOMlchxmzUYfGvIW1nvi7M5w&s=10", // Escudo FCF
    "COL-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9w1Z2nX__GrdVA_j-l5kmrW8tEp-OwCtJshDKSUgPA&s=10", // Camilo Vargas
    "COL-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dEMWdR8_tN8mYyWIxQGHPTaqW53VoKdmpn08G_qSyQ&s=10", // Daniel Muñoz
    "COL-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLFTeTOFsjvbt1-BmlnCWwmW4csYBaMsTH5z1ocerXA&s", // Davinson Sánchez
    "COL-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJSVbnveWluQdCe5wcvWFwpkBox76yTyHugByMv-Y6w&s=10", // Carlos Cuesta
    "COL-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzx8aeCKV_92SMIiSa44WZ0Ah_-4xATktlV2QFnIXvg&s=10", // Johan Mojica
    "COL-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qg5dQYNQvMpZ_iEp2Re_bw2bNAJCePOdEtsQS-v6Nw&s=10", // Jefferson Lerma
    "COL-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzlHgY5745QjRF8yJhq0HouuQsfMMlqVaHr_6oJ5BNfw&s=10", // Richard Ríos
    "COL-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEd4vo6UkQ7OXBAqonmvTi4AIMAz0DNODSG9nekw49OQ&s=10", // James Rodríguez
    "COL-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRak3YIgbcOcRwmMiguFG6SI3o6EtAcM0qI5bS_KRwtzg&s=10", // Luis Díaz
    "COL-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwnOKg8rmEUwZlcn9UuBX4N_v7WA2xBCdGG7k9MJtLw&s=10", // Jhon Arias
    "COL-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuE_hRtjQfBtomDTi5sL7lPiwHznQvAW-L7hinMEtcDQ&s=10", // Jhon Córdoba

    // --- Inglaterra (ENG) ---
    "ENG-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGl_3M6SRcb7MhVrGshxKZ3EOTVYlsNGVBvQnHMcs1oA&s", // Escudo FA
    "ENG-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7dxZErnbsIVmgBsFJSsooVB_e4hLV-C-_yyyeeLjXcw&s", // Jordan Pickford
    "ENG-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ_akHYYnptpnKW29ecT7eBU42asXm72qlMu_EHC71tQ&s=10", // Kyle Walker
    "ENG-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIxZYcd5pQH01ydxrwOjnzd9N5UthJgcxT9da-bRr3Fg&s", // John Stones
    "ENG-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhosalpgv6xeCB4Ti1BeDl7fXN5Hh0js80zvTMFet8Dw&s=10", // Marc Guéhi
    "ENG-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSiJL3Yt8on3eYgLxYpGaXPq6NQ_Oe_KhYhNWl4RYqw&s", // Kieran Trippier
    "ENG-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppUvTJIase3Y_SWyHVxcq-Qj7btSLMl0-umaih6TcjA&s", // Declan Rice
    "ENG-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRznz92FuqJ2cLwRDfJcLtOEQMCq-6YriyOaWmd8mmkkw&s=10", // Jude Bellingham
    "ENG-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeel6yc5OTHT7zGJqJeXHs88aylx6C0JboYf292mIjHg&s=10", // Phil Foden
    "ENG-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO7CtqX8ESYEbp-xJ3pC3c3Tc8OupO-6ldyHuAo6u96w&s", // Harry Kane
    "ENG-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_fZ4p2bbXUMexmEu-iDDyVM_1QEvsoQD0U4lR9PZdQ&s", // Bukayo Saka
    "ENG-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTgLxTZXOES-e8XfD1WxnTl4xnL0tzkfWr71wBCTBfg&s=10", // Cole Palmer

    // --- Croacia (CRO) ---
    "CRO-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPJhb3sljzml1bmkzS2hi9wR25R-T1vwSaTKUwqXvz8g&s", // Escudo HNS
    "CRO-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDkqKTecqJ0znV42UK1Q8TVUVWdU_Pn5Kkr3YUKHm6w&s=10", // Dominik Livaković
    "CRO-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIT1EnMRJxaa4gKqXTLRC0PswUEYXSMn8fYMvYDfVnKg&s", // Josip Juranović
    "CRO-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvXnqApp7sMeo_WV9bVApyzoqxIVZ-M8GukrAYqh6SA&s", // Josip Šutalo
    "CRO-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREs0hNASxiU4PIFnTSfDzBkDsEVGUa25QYao6U6fvniQ&s", // Joško Gvardiol
    "CRO-6": "https://media.losandes.com.ar/adjuntos/368/migration/resizer/v2/JD4E6YL4MRA3BACR6PYTXJYDBY.jpg?auth=01e70b4dcb85c0356ac0480a38ce0ac4ddf045974b778b9016702330214dc090&width=1152&height=1152", // Borna Sosa
    "CRO-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSHOSr7Nw9Bdfc9WolbMdrjTduSzngD3PstA2vxdpp4Q&s", // Luka Modrić
    "CRO-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmY8dKyyGReFOJlJZkv_keHd9QWW2VrhMLTKTXeo7bSA&s=10", // Mateo Kovačić
    "CRO-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNexCYCgr2UJL8Hp77fGIL3kvlGiQ0ENDhXoPW-ODYg&s=10", // Mario Pašalić
    "CRO-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIkRdLjjMk0b-PaLP054Oxa3rEKEZlpAKIzGndas9Tg&s=10", // Andrej Kramarić
    "CRO-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWjQrUFyQ1S8M9gM5AKeSo_Qh0PyI8qyHBI9Nky48Oww&s", // Ante Budimir
    "CRO-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLa-Xp3P-QC2FMyUHvlOL4U12zFWGJ8jxymbQv4KkVwg&s=10", // Ivan Perišić

    // --- Ghana (GHA) ---
    "GHA-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOo-ipRJmb7F3jt0rAWuFjmf8L0TLRM7_-S4uMmYBMA&s=10", // Escudo GFA
    "GHA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZbb7AXgXqvimk7zbs2WhxFWoWWaNfYJoMfavYtUKmg&s", // Lawrence Ati-Zigi
    "GHA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6EMRM3kZjVLzJvZPOZk_tnbVgI_bE92q81bOnLX_dnQ&s=10", // Tariq Lamptey
    "GHA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYm_q-1bF12slvqESxwKG2KGYxPwXVaI5zvLHCPXweDA&s", // Daniel Amartey
    "GHA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPRCZ2uj6cvBjxs4FhVriplPGh1m5npd4a8FSOenqMGw&s=10", // Alexander Djiku
    "GHA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_AlkfMTVWb1_MeLjAF5PKQ0FTOD6eEhbxTSVVE6EXAQ&s=10", // Gideon Mensah
    "GHA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkbfSvBq0SU3xDGNRMgJhLu_M_JMWyCsGI3wEp13j4wA&s=10", // Thomas Partey
    "GHA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pE-aA10zKmGtsNyVfCkFQ8KKZ66oUaVUpxG0O_UUUA&s=10", // Mohammed Kudus
    "GHA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4v2a9iOp7w0TwhDNtw47UkrC-EBccirBX91l41eOE9A&s=10", // Salis Abdul Samed
    "GHA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJFk_CbVOSHXYeBD-kVbANMHANLd8ewzWnQDxlS7g3g&s=10", // Jordan Ayew
    "GHA-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRo7VawoTXGCx2WPxi-MK9n4FKxnIzd4GfNr9j4sIkhQ&s", // Inaki Williams
    "GHA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKm3xxlAD2pmdfoldyWqGDeo82gsZGEEsfClkPowzebQ&s=10", // Antoine Semenyo

    // --- Panamá (PAN) ---
    "PAN-1": "https://i.pinimg.com/736x/9e/ce/94/9ece944f6eb12a03c88310a9625d03e0.jpg", // Escudo FEPAFUT
    "PAN-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzBggLWt6n0kEcAXyQAxxH65EthkxCbByN2Qah8SZZQg&s", // Orlando Mosquera
    "PAN-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEj4CzsokEkb256xPRrPyomGNrkyVuQfF1Yi63863mOA&s=10", // Michael Murillo
    "PAN-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT7YuASFsHjRuyqcf8zfWV4MH59tlU-TLjvk3hgCOZLg&s", // José Córdoba
    "PAN-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNp2YNF5KRk9XbQ1Srn-5uaowofZjVvgy6ZXrk3twYDA&s=10", // Edgardo Fariña
    "PAN-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM9S6MHu6Z12LOt0UitVdxCDribFCG-x0eVzbO9gi_Eg&s", // Roderick Miller
    "PAN-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgeNWaiZlPbFCVHSkLxwkDHWBQMRM6kYSrbe42quKjZg&s=10", // Adalberto Carrasquilla
    "PAN-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdRQ-Fsr5jDKKwK4_9WIYVQGzQ96QD1NUqQIarSZ0j5g&s", // Cristian Martínez
    "PAN-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHc_BRx1cUCLiCBRbQNXKhC_tkmzOkx5uDuOgg3nERBQ&s", // Yoel Bárcenas
    "PAN-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9zVGtWakcjQ4ZEE-StUaOwLk3DrXcAyjMvU6SC47lA&s=10", // Ismael Díaz
    "PAN-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVIZD-xLElH3fU8nloAUQd6ofndEt0-JmLsCb8INTmQ&s=10", // José Fajardo
    "PAN-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdvjNThKq48Gy1Xq8iNtSPfjU9X9B1R8UNm9PCjCzCQ&s=10" // Eduardo Guerrero
};
