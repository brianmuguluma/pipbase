import { Component, computed, effect, signal } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, SlicePipe } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import { UserRecord } from '../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormatRelativePipe,
    NavbarComponent,
    SlicePipe,
    AvatarComponent,
    FooterComponent,
    DecimalPipe,
    DatePipe,
    NgClass,
  ],
})
export class UsersPage {
  users = signal<UserRecord[]>([]);
  userCount = signal<number>(0);
  subscriberCount = signal<number>(0);
  pageToken = signal<string | undefined>('');
  maxResults = signal(20);
  isEnd = computed(() => this.computeIsEnd());
  constructor(
    public auth: AuthService,
    private usersService: UsersService,
  ) {
    effect(() => {
      if (auth.profile()) {
        this.listUsers();
        this.getStats();
      }
    });
  }

  computeIsEnd() {
    return this.userCount() === this.users().length;
  }

  async bulkCreateUsers() {
    const users = [
      {
        displayName: 'Pyotr Riccelli',
        last_name:
          'https://robohash.org/quaedoloremomnis.png?size=50x50&set=set1',
        email: 'priccelli0@biblegateway.com',
      },
      {
        displayName: 'Gerda Bau',
        last_name:
          'https://robohash.org/maximemollitiaesse.png?size=50x50&set=set1',
        email: 'gbau1@blog.com',
      },
      {
        displayName: 'Carmelita Lyes',
        last_name:
          'https://robohash.org/autquiarchitecto.png?size=50x50&set=set1',
        email: 'clyes2@wikispaces.com',
      },
      {
        displayName: 'Ephrayim Hyett',
        last_name: 'https://robohash.org/auteadebitis.png?size=50x50&set=set1',
        email: 'ehyett3@state.gov',
      },
      {
        displayName: 'Nikaniki Ciotti',
        last_name:
          'https://robohash.org/voluptasutunde.png?size=50x50&set=set1',
        email: 'nciotti4@mediafire.com',
      },
      {
        displayName: 'Laney Baldrick',
        last_name:
          'https://robohash.org/omnissolutaexplicabo.png?size=50x50&set=set1',
        email: 'lbaldrick5@europa.eu',
      },
      {
        displayName: 'Redford Flatte',
        last_name:
          'https://robohash.org/cupiditateutvoluptas.png?size=50x50&set=set1',
        email: 'rflatte6@yellowbook.com',
      },
      {
        displayName: 'Katharina Gledhall',
        last_name:
          'https://robohash.org/laboriosamdoloremofficiis.png?size=50x50&set=set1',
        email: 'kgledhall7@yahoo.com',
      },
      {
        displayName: 'Lyndel Giddons',
        last_name:
          'https://robohash.org/nonminimadolores.png?size=50x50&set=set1',
        email: 'lgiddons8@sbwire.com',
      },
      {
        displayName: 'Tarrance Maruszewski',
        last_name:
          'https://robohash.org/corporisquiautem.png?size=50x50&set=set1',
        email: 'tmaruszewski9@soundcloud.com',
      },
      {
        displayName: 'Dael Cargo',
        last_name:
          'https://robohash.org/eaconsequaturnam.png?size=50x50&set=set1',
        email: 'dcargoa@squidoo.com',
      },
      {
        displayName: 'Marla Heijne',
        last_name: 'https://robohash.org/quirationeut.png?size=50x50&set=set1',
        email: 'mheijneb@mayoclinic.com',
      },
      {
        displayName: 'Fawn Madgwich',
        last_name: 'https://robohash.org/quiiustosint.png?size=50x50&set=set1',
        email: 'fmadgwichc@technorati.com',
      },
      {
        displayName: 'Slade Belvin',
        last_name:
          'https://robohash.org/quisearumdolor.png?size=50x50&set=set1',
        email: 'sbelvind@hostgator.com',
      },
      {
        displayName: 'Sheena MacNamara',
        last_name:
          'https://robohash.org/etiustomaiores.png?size=50x50&set=set1',
        email: 'smacnamarae@blogspot.com',
      },
      {
        displayName: 'Kennie Tofts',
        last_name:
          'https://robohash.org/quasiaperiamratione.png?size=50x50&set=set1',
        email: 'ktoftsf@bluehost.com',
      },
      {
        displayName: 'Warren Sloley',
        last_name:
          'https://robohash.org/sunteavoluptatibus.png?size=50x50&set=set1',
        email: 'wsloleyg@fda.gov',
      },
      {
        displayName: 'Humphrey Pargeter',
        last_name:
          'https://robohash.org/adtotamperspiciatis.png?size=50x50&set=set1',
        email: 'hpargeterh@ibm.com',
      },
      {
        displayName: 'Jacintha Jankowski',
        last_name:
          'https://robohash.org/fugiatdictaquasi.png?size=50x50&set=set1',
        email: 'jjankowskii@patch.com',
      },
      {
        displayName: 'Emilee Juorio',
        last_name:
          'https://robohash.org/etquasialiquam.png?size=50x50&set=set1',
        email: 'ejuorioj@sciencedirect.com',
      },
      {
        displayName: 'Karol McErlaine',
        last_name:
          'https://robohash.org/voluptatemconsequaturvoluptas.png?size=50x50&set=set1',
        email: 'kmcerlainek@opera.com',
      },
      {
        displayName: 'Kippar Cattermull',
        last_name:
          'https://robohash.org/sintpraesentiumenim.png?size=50x50&set=set1',
        email: 'kcattermulll@jimdo.com',
      },
      {
        displayName: 'Cleve Mangham',
        last_name:
          'https://robohash.org/ipsumodiototam.png?size=50x50&set=set1',
        email: 'cmanghamm@cpanel.net',
      },
      {
        displayName: 'Aurelie Whytock',
        last_name:
          'https://robohash.org/eligendicorporisaut.png?size=50x50&set=set1',
        email: 'awhytockn@fotki.com',
      },
      {
        displayName: 'Olympie Carlesso',
        last_name:
          'https://robohash.org/etconsequaturmolestiae.png?size=50x50&set=set1',
        email: 'ocarlessoo@freewebs.com',
      },
      {
        displayName: 'Adair Bowra',
        last_name:
          'https://robohash.org/consequaturodioeos.png?size=50x50&set=set1',
        email: 'abowrap@guardian.co.uk',
      },
      {
        displayName: 'Wallache Leynagh',
        last_name: 'https://robohash.org/abquodculpa.png?size=50x50&set=set1',
        email: 'wleynaghq@nhs.uk',
      },
      {
        displayName: 'Tome Drohun',
        last_name:
          'https://robohash.org/sitculpasapiente.png?size=50x50&set=set1',
        email: 'tdrohunr@4shared.com',
      },
      {
        displayName: 'Niel Edwardes',
        last_name:
          'https://robohash.org/ipsumremcorrupti.png?size=50x50&set=set1',
        email: 'nedwardess@apache.org',
      },
      {
        displayName: 'Jasmine Freddi',
        last_name:
          'https://robohash.org/occaecatiquidemsit.png?size=50x50&set=set1',
        email: 'jfreddit@nih.gov',
      },
      {
        displayName: 'Margarethe Bogue',
        last_name:
          'https://robohash.org/repellendusetquibusdam.png?size=50x50&set=set1',
        email: 'mbogueu@icq.com',
      },
      {
        displayName: 'Gertrudis Paskin',
        last_name:
          'https://robohash.org/veritatisnostrumqui.png?size=50x50&set=set1',
        email: 'gpaskinv@gov.uk',
      },
      {
        displayName: 'Pat Skeath',
        last_name:
          'https://robohash.org/temporibusporroquod.png?size=50x50&set=set1',
        email: 'pskeathw@odnoklassniki.ru',
      },
      {
        displayName: 'Morissa de Najera',
        last_name:
          'https://robohash.org/nesciuntteneturratione.png?size=50x50&set=set1',
        email: 'mdex@ox.ac.uk',
      },
      {
        displayName: 'Colet Boliver',
        last_name:
          'https://robohash.org/errorperferendisaut.png?size=50x50&set=set1',
        email: 'cbolivery@xinhuanet.com',
      },
      {
        displayName: 'Corinna Wellard',
        last_name:
          'https://robohash.org/placeatmolestiaealias.png?size=50x50&set=set1',
        email: 'cwellardz@fda.gov',
      },
      {
        displayName: 'Jarret Arnaudet',
        last_name:
          'https://robohash.org/doloremfugitrerum.png?size=50x50&set=set1',
        email: 'jarnaudet10@ebay.com',
      },
      {
        displayName: 'Adair Garie',
        last_name:
          'https://robohash.org/repudiandaeatveritatis.png?size=50x50&set=set1',
        email: 'agarie11@networksolutions.com',
      },
      {
        displayName: 'Susi Dechelette',
        last_name:
          'https://robohash.org/suscipitvoluptaspariatur.png?size=50x50&set=set1',
        email: 'sdechelette12@tmall.com',
      },
      {
        displayName: 'Louisette Golder',
        last_name: 'https://robohash.org/cumqueabnobis.png?size=50x50&set=set1',
        email: 'lgolder13@typepad.com',
      },
      {
        displayName: 'Rodge Karel',
        last_name: 'https://robohash.org/etutsunt.png?size=50x50&set=set1',
        email: 'rkarel14@nature.com',
      },
      {
        displayName: 'Cordy Reeday',
        last_name:
          'https://robohash.org/utmaioreslaudantium.png?size=50x50&set=set1',
        email: 'creeday15@google.co.uk',
      },
      {
        displayName: 'Randolph Rathborne',
        last_name: 'https://robohash.org/nemovelitiure.png?size=50x50&set=set1',
        email: 'rrathborne16@cnet.com',
      },
      {
        displayName: 'Don Heinicke',
        last_name:
          'https://robohash.org/eumdeserunthic.png?size=50x50&set=set1',
        email: 'dheinicke17@va.gov',
      },
      {
        displayName: 'Staci Collyear',
        last_name:
          'https://robohash.org/quibusdamaperiamdicta.png?size=50x50&set=set1',
        email: 'scollyear18@webeden.co.uk',
      },
      {
        displayName: 'Dewain Pawlik',
        last_name:
          'https://robohash.org/repellatquosaut.png?size=50x50&set=set1',
        email: 'dpawlik19@twitter.com',
      },
      {
        displayName: 'Alphonse Ison',
        last_name:
          'https://robohash.org/utteneturplaceat.png?size=50x50&set=set1',
        email: 'aison1a@eventbrite.com',
      },
      {
        displayName: 'Angelo Want',
        last_name:
          'https://robohash.org/accusantiumaliquidquia.png?size=50x50&set=set1',
        email: 'awant1b@cnbc.com',
      },
      {
        displayName: 'Alphard Jeckells',
        last_name:
          'https://robohash.org/quiaitaqueoptio.png?size=50x50&set=set1',
        email: 'ajeckells1c@paypal.com',
      },
      {
        displayName: 'Karlie Beckett',
        last_name:
          'https://robohash.org/velitrationevoluptates.png?size=50x50&set=set1',
        email: 'kbeckett1d@prweb.com',
      },
      {
        displayName: 'Christa Dupoy',
        last_name:
          'https://robohash.org/explicabosequitempore.png?size=50x50&set=set1',
        email: 'cdupoy1e@admin.ch',
      },
      {
        displayName: 'Reginauld Scholcroft',
        last_name:
          'https://robohash.org/utvitaeofficiis.png?size=50x50&set=set1',
        email: 'rscholcroft1f@wp.com',
      },
      {
        displayName: 'Bill Saville',
        last_name:
          'https://robohash.org/itaquequaenecessitatibus.png?size=50x50&set=set1',
        email: 'bsaville1g@yolasite.com',
      },
      {
        displayName: 'Gwyn MacCoughen',
        last_name:
          'https://robohash.org/eosdignissimossit.png?size=50x50&set=set1',
        email: 'gmaccoughen1h@yahoo.co.jp',
      },
      {
        displayName: 'Rania Shelton',
        last_name:
          'https://robohash.org/providentcumut.png?size=50x50&set=set1',
        email: 'rshelton1i@bandcamp.com',
      },
      {
        displayName: 'Cassi Files',
        last_name:
          'https://robohash.org/minimaplaceatin.png?size=50x50&set=set1',
        email: 'cfiles1j@printfriendly.com',
      },
      {
        displayName: 'Loren Blas',
        last_name:
          'https://robohash.org/nequedeseruntcum.png?size=50x50&set=set1',
        email: 'lblas1k@answers.com',
      },
      {
        displayName: 'Aurelia Pincott',
        last_name: 'https://robohash.org/nesciuntetid.png?size=50x50&set=set1',
        email: 'apincott1l@digg.com',
      },
      {
        displayName: 'Mead Middleton',
        last_name:
          'https://robohash.org/doloreseosmodi.png?size=50x50&set=set1',
        email: 'mmiddleton1m@buzzfeed.com',
      },
      {
        displayName: 'Missie Dransfield',
        last_name:
          'https://robohash.org/molestiaerecusandaedolorum.png?size=50x50&set=set1',
        email: 'mdransfield1n@pinterest.com',
      },
      {
        displayName: 'Mitch Blampy',
        last_name:
          'https://robohash.org/mollitiavoluptatumautem.png?size=50x50&set=set1',
        email: 'mblampy1o@cyberchimps.com',
      },
      {
        displayName: 'Tobye Dibsdale',
        last_name:
          'https://robohash.org/laboriosamculpaexercitationem.png?size=50x50&set=set1',
        email: 'tdibsdale1p@weebly.com',
      },
      {
        displayName: 'Glenn Girodin',
        last_name:
          'https://robohash.org/voluptasnumquamipsum.png?size=50x50&set=set1',
        email: 'ggirodin1q@netscape.com',
      },
      {
        displayName: 'Maryellen Smurfitt',
        last_name:
          'https://robohash.org/eiusrationequo.png?size=50x50&set=set1',
        email: 'msmurfitt1r@reuters.com',
      },
      {
        displayName: 'Ray Aitchison',
        last_name: 'https://robohash.org/omniseaodio.png?size=50x50&set=set1',
        email: 'raitchison1s@mashable.com',
      },
      {
        displayName: 'Liana Richardsson',
        last_name:
          'https://robohash.org/reiciendisautdolorem.png?size=50x50&set=set1',
        email: 'lrichardsson1t@va.gov',
      },
      {
        displayName: 'Henrieta Scatchard',
        last_name:
          'https://robohash.org/ipsumvoluptatumconsequuntur.png?size=50x50&set=set1',
        email: 'hscatchard1u@nsw.gov.au',
      },
      {
        displayName: 'Aubrette Taggerty',
        last_name:
          'https://robohash.org/omnismaioresvoluptatem.png?size=50x50&set=set1',
        email: 'ataggerty1v@elpais.com',
      },
      {
        displayName: 'Leta Galliard',
        last_name:
          'https://robohash.org/accusamusdignissimosenim.png?size=50x50&set=set1',
        email: 'lgalliard1w@seesaa.net',
      },
      {
        displayName: 'Arlie Treby',
        last_name:
          'https://robohash.org/etconsequaturquibusdam.png?size=50x50&set=set1',
        email: 'atreby1x@dailymotion.com',
      },
      {
        displayName: 'Jaime Lashmar',
        last_name: 'https://robohash.org/oditquiaet.png?size=50x50&set=set1',
        email: 'jlashmar1y@mashable.com',
      },
      {
        displayName: 'Nappy De Mitris',
        last_name:
          'https://robohash.org/molestiaequiconsequatur.png?size=50x50&set=set1',
        email: 'nde1z@thetimes.co.uk',
      },
      {
        displayName: 'Klaus Collihole',
        last_name: 'https://robohash.org/quiadoloreset.png?size=50x50&set=set1',
        email: 'kcollihole20@time.com',
      },
      {
        displayName: 'Burke Pulver',
        last_name:
          'https://robohash.org/eaqueconsecteturlaborum.png?size=50x50&set=set1',
        email: 'bpulver21@instagram.com',
      },
      {
        displayName: 'Vanda Macewan',
        last_name:
          'https://robohash.org/omnisaliquidconsequuntur.png?size=50x50&set=set1',
        email: 'vmacewan22@desdev.cn',
      },
      {
        displayName: 'Jemima Twallin',
        last_name: 'https://robohash.org/officiaexquia.png?size=50x50&set=set1',
        email: 'jtwallin23@ted.com',
      },
      {
        displayName: 'Bealle Patsall',
        last_name: 'https://robohash.org/velitsequisit.png?size=50x50&set=set1',
        email: 'bpatsall24@ehow.com',
      },
      {
        displayName: 'Minny Benedicto',
        last_name: 'https://robohash.org/estauthic.png?size=50x50&set=set1',
        email: 'mbenedicto25@statcounter.com',
      },
      {
        displayName: 'Aleta Peace',
        last_name: 'https://robohash.org/quoomnisanimi.png?size=50x50&set=set1',
        email: 'apeace26@goodreads.com',
      },
      {
        displayName: 'Anitra Ruger',
        last_name: 'https://robohash.org/nametvelit.png?size=50x50&set=set1',
        email: 'aruger27@hatena.ne.jp',
      },
      {
        displayName: 'Wenonah Bricklebank',
        last_name:
          'https://robohash.org/laboreautrepellendus.png?size=50x50&set=set1',
        email: 'wbricklebank28@mashable.com',
      },
      {
        displayName: 'Hansiain Woolard',
        last_name:
          'https://robohash.org/doloremquequiatempora.png?size=50x50&set=set1',
        email: 'hwoolard29@booking.com',
      },
      {
        displayName: 'Parrnell Balma',
        last_name:
          'https://robohash.org/voluptatemaccusantiumreiciendis.png?size=50x50&set=set1',
        email: 'pbalma2a@eepurl.com',
      },
      {
        displayName: 'Nell Snashall',
        last_name: 'https://robohash.org/etoptioest.png?size=50x50&set=set1',
        email: 'nsnashall2b@woothemes.com',
      },
      {
        displayName: 'Kimberlyn Hadden',
        last_name: 'https://robohash.org/veltotamat.png?size=50x50&set=set1',
        email: 'khadden2c@barnesandnoble.com',
      },
      {
        displayName: 'Mirna Cheesman',
        last_name: 'https://robohash.org/idnisidolor.png?size=50x50&set=set1',
        email: 'mcheesman2d@cbslocal.com',
      },
      {
        displayName: 'Corbin Szymanski',
        last_name: 'https://robohash.org/autenimodio.png?size=50x50&set=set1',
        email: 'cszymanski2e@java.com',
      },
      {
        displayName: 'Cyrillus Pletts',
        last_name:
          'https://robohash.org/cupiditatenatusinventore.png?size=50x50&set=set1',
        email: 'cpletts2f@tripod.com',
      },
      {
        displayName: 'Donal McShee',
        last_name:
          'https://robohash.org/animiexercitationemfuga.png?size=50x50&set=set1',
        email: 'dmcshee2g@constantcontact.com',
      },
      {
        displayName: 'Annaliese Mosedale',
        last_name: 'https://robohash.org/aperiametquae.png?size=50x50&set=set1',
        email: 'amosedale2h@mayoclinic.com',
      },
      {
        displayName: 'Elita Seebright',
        last_name: 'https://robohash.org/sitnesciuntet.png?size=50x50&set=set1',
        email: 'eseebright2i@diigo.com',
      },
      {
        displayName: 'Lory Hurkett',
        last_name: 'https://robohash.org/eateneturamet.png?size=50x50&set=set1',
        email: 'lhurkett2j@businessinsider.com',
      },
      {
        displayName: 'Marcel Grovier',
        last_name: 'https://robohash.org/eaetdicta.png?size=50x50&set=set1',
        email: 'mgrovier2k@walmart.com',
      },
      {
        displayName: 'Dulciana Jeffcoate',
        last_name:
          'https://robohash.org/evenietnumquamreprehenderit.png?size=50x50&set=set1',
        email: 'djeffcoate2l@naver.com',
      },
      {
        displayName: 'Perceval Riggeard',
        last_name: 'https://robohash.org/eumestcum.png?size=50x50&set=set1',
        email: 'priggeard2m@businessweek.com',
      },
      {
        displayName: 'Joanie Burbury',
        last_name:
          'https://robohash.org/idvoluptateeos.png?size=50x50&set=set1',
        email: 'jburbury2n@networksolutions.com',
      },
      {
        displayName: "Zebulen O'Dowling",
        last_name:
          'https://robohash.org/doloremestaspernatur.png?size=50x50&set=set1',
        email: 'zodowling2o@thetimes.co.uk',
      },
      {
        displayName: 'Moyra Durie',
        last_name: 'https://robohash.org/undeistevelit.png?size=50x50&set=set1',
        email: 'mdurie2p@geocities.com',
      },
      {
        displayName: 'Rubina Staner',
        last_name:
          'https://robohash.org/exercitationemaliascorrupti.png?size=50x50&set=set1',
        email: 'rstaner2q@ameblo.jp',
      },
      {
        displayName: 'Fawne Brabbs',
        last_name: 'https://robohash.org/etavoluptatem.png?size=50x50&set=set1',
        email: 'fbrabbs2r@woothemes.com',
      },
    ];

    for await (const user of users) {
      await this.auth.createUserWithEmailAndPassword(user.email, '123456');
      await this.auth.updateProfile({
        displayName: user.displayName,
        photoURL: user.last_name,
      });
      console.log(user, this.auth.profile());
    }
  }

  getStats() {
    this.getUserCount();
    this.getSubscriberCount();
  }

  async getUserCount() {
    this.userCount.set(await this.usersService.getUserCount());
  }

  async listUsers(pageToken?: string) {
    const options: any = {
      maxResults: this.maxResults(),
    };

    if (pageToken) options.pageToken = pageToken;

    const { data } = await this.usersService.listUsers(options);

    this.pageToken.set((data as any).pageToken);
    this.users.set([...this.users(), ...(data as any).users]);
  }

  async listMoreUsers(event?: any) {
    await this.listUsers(this.pageToken());
    // (event as InfiniteScrollCustomEvent)?.target?.complete();
  }

  async getSubscriberCount() {
    this.subscriberCount.set(await this.usersService.getSubscriberCount());
  }
}
