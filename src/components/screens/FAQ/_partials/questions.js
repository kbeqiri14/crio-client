import { Fragment } from 'react';
import { Col, Divider, Row, Text } from '@ui-kit';

export const questions = [
  {
    key: 0,
    question: 'What is Crio?',
    answer: (
      <li>
        Crio is a community-driven marketplace where creators can offer digital products, online
        services, and premium content to their fans.
      </li>
    ),
  },
  {
    key: 1,
    question: 'What are the main features of Crio?',
    answer: (
      <Fragment>
        <li>
          <b>Creator Profile:</b> Once a creator signs-up, they can quickly set up a profile, which
          will consist of two main parts
          <ul>
            <li>
              <b>Marketplace:</b> The marketplace section will feature all of a creator's digital
              products & services.
            </li>
            <li>
              <b>Portfolio:</b> The portfolio section will contain a Creator’s free and premium
              content.
            </li>
          </ul>
        </li>
        <li>
          <b>Discovery Feed </b>
          <ul>
            <li>
              Every digital product & service from all creators gets featured in our Discovery feed,
              which will make it easier for fans to browse, shop and discover new creators.
            </li>
          </ul>
        </li>
      </Fragment>
    ),
  },
  {
    key: 2,
    question: 'How can I sign-up as a Creator?',
    answer: (
      <Fragment>
        <li>Right now, we have an invite only program to join as a creator.</li>
        <li>
          Email us directly at{' '}
          <a href={`mailto:info@criointeractive.com`}> info@criointeractive.com </a> and we can
          upgrade your account to “Creator” status.
        </li>
      </Fragment>
    ),
  },
  {
    key: 3,
    question: 'Is Crio free for Creators?',
    answer: <li>Crio is completely free for creators to join and use all the features.</li>,
  },
  {
    key: 4,
    question: 'What can Creators offer on Crio?',
    answer: (
      <Fragment>
        <li>
          <b>Digital Products: </b>
          Creators can sell any digital product, including eBooks, artwork, templates, digital art
          assets (e.g., PSD files), game assets, software, guides, and much more!
        </li>
        <li>
          <b>Online Services/Perks: </b>
          Creators can also offer various services like commissions, access to special Discord
          channels, special credits, 1 on 1 time, etc.
        </li>
        <li>
          <b>Premium Content: </b>
          Creators can post free content for all users or offer exclusive content (e.g., tutorials)
          for only subscribers who follow their profile.
        </li>
      </Fragment>
    ),
  },
  {
    key: 5,
    question: 'What can’t Creators offer on Crio?',
    answer: (
      <li>
        We try to stay away from physical products that need to be shipped or in-person services.
      </li>
    ),
  },
  {
    key: 6,
    question: 'How to add a new product / service?',
    answer: (
      <Fragment>
        <li>
          Creators can click the “Upload” button and follow the instructions to upload a new
          product/service or content.
        </li>
        <li>
          <b>Accessibility:</b> There are two main accessibility settings for products and content:
          <ul>
            <li>
              <b>Subscribers-only: </b> Creators can set certain products/services/content as
              “Subscriber-only” accessible. In order for users to gain access, they will need to
              first subscribe to Crio and then follow the creator.
              <ul>
                <li>
                  <em>
                    Free products are “subscriber-only” accessible since users have already paid to
                    be part of the community. It also serves as a tool to make it easier for
                    creators to attract more subscribers to follow their channel.
                  </em>
                </li>
              </ul>
            </li>
            <li>
              <b>Everyone: </b>
              Creators can also make things accessible to “everyone” on Crio (including non-signed
              up users) and openly sell digital products and services for a specific price.
            </li>
          </ul>
        </li>
      </Fragment>
    ),
  },
  {
    key: 7,
    question: 'How can a Creator fulfill an order?',
    answer: (
      <Fragment>
        <li>
          Once a fan makes a purchase of a service, the Creator will get an automatic email alert
          connecting them to the fan. Creators can fulfill the service over email.
        </li>
        <li>For digital products, fans can simply download after they make a purchase.</li>
      </Fragment>
    ),
  },
  {
    key: 8,
    question: 'Ownership of Content and Products',
    answer: (
      <Fragment>
        <li>
          You keep full ownership of all creations that you offer on Crio. As such, you are
          responsible for all activity on your profile. Don’t do anything fraudulent, abusive, and
          otherwise illegal as we reserve the full right to terminate your account.
        </li>
        <li>Please see our “Terms of Use” for more info.</li>
      </Fragment>
    ),
  },
  {
    key: 9,
    question: 'How do Creators make money?',
    answer: (
      <Fragment>
        <li>
          <b>Subscription Revenue: </b>
          80% of Crio’s subscription revenue from fans gets put in a “Creator Pool.” We then
          distribute this revenue to each creator at the end of every month based on the number of
          subscribers that follow their profile.
        </li>
        <li>
          <b>eCommerce Revenue: </b>
          Creators can also sell individual digital products and services to anyone on Crio (both
          subscribers and casual fans) and make transactional income every time someone makes a
          purchase.
        </li>
      </Fragment>
    ),
  },
  {
    key: 10,
    question: 'Who can follow Creators on Crio?',
    answer: (
      <Fragment>
        <li>Only fans who are subscribed to Crio can follow creators</li>
        <li>
          Once a fan has subscribed, they can follow any creator to support their work and also gain
          access to exclusive content or free products/services.
        </li>
      </Fragment>
    ),
  },
  {
    key: 11,
    question: 'How does subscription revenue share work with Creators?',
    answer: (
      <Fragment>
        <li>Crio puts 80% of all platform subscription revenue from fans into a “Creator Pool”</li>
        <li>Creators are paid from this pool each month based on the below formula</li>
        <Row padding_vertical={30} align='middle'>
          <Col md={11} xs={12} align='center'>
            <Text level={1} color='error100'>
              # of fans following you
            </Text>
            <Divider />
            <Text level={1} color='error100'>
              Total # of fans following all creators
            </Text>
          </Col>
          <Col md={4} xs={12} align='center'>
            <Text level={1} color='error100'>
              {' '}
              x &nbsp; &nbsp; Creator Pool
            </Text>
          </Col>
        </Row>
        <li>
          <b>Example: </b>
          <br />
          <ul>
            <li>
              Let’s say Crio has 1,000 total subscribers * $7 / month = $7,000/month in total
              monthly recurring revenue.
            </li>
            <li>The “Creator Pool” is therefor $5,600/month (80% * $7,000)</li>
            <li>
              Let’s say there are 2 creators on Crio: Creator A has 700 subscribers and Creator B
              has 300 subscribers following them.
              <ul>
                <li>
                  <b>Creator A: </b>
                  700 / 1000 = 70%. Creator A earns 70% x $5,600 or <b>$3,920 / month.</b>
                </li>
                <li>
                  <b>Creator B: </b>300 / 1000 = 30%. Creator B earns 30% x $5,600 or{' '}
                  <b>$1,680 / month.</b>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          The more active a creator is, the more followers they will get, and the more money they
          receive from Crio’s “Creator Pool.”
        </li>
      </Fragment>
    ),
  },
  {
    key: 12,
    question: 'How does eCommerce revenue work for Creators?',
    answer: (
      <Fragment>
        <li>
          Every time a creator sells a product or service, they will automatically get paid for that
          transaction.
        </li>
        <li>
          Creators keep 90% of each transaction, Crio takes 10% (this is to cover transaction fees
          and the cost of operations such as paying our employees).
        </li>
      </Fragment>
    ),
  },
  {
    key: 13,
    question: 'How will Creators get Paid?',
    answer: (
      <Fragment>
        <li>
          <b>eCommerce: </b>
          We are partnering with{' '}
          <a rel='noreferrer' target='_blank' href='https://stripe.com/'>
            Stripe{' '}
          </a>
          , one of the largest and most secure payment processors in the world, to manage payment
          automation. Creators can quickly sign-up with Stripe’s express account on Crio and connect
          their bank/debit card securely so that every time they sell a product/service, they
          immediately receive this payment to their account! Creators can also track their revenue
          through the Stripe Express Dashboard.
        </li>
        <li>
          <b>Subscription: </b>
          Subscription payments will automatically be sent to each creator’s Stripe Express accounts
          at the end of every month (either the 30<sup>th</sup> or 31<sup>st</sup> at 11:59 EST).
        </li>
      </Fragment>
    ),
  },
  {
    key: 14,
    question: 'How can Creators get more followers?',
    answer: (
      <Fragment>
        <li>
          <b>Bring current fans: </b>
          Creators can ask their current audiences from other social media to support them on Crio
          by subscribing and then following their profile.
        </li>
        <li>
          <b>Get Discovered on Crio: </b>
          Creators who are active posting new products and content will get featured on Crio’s
          Discovery Feed more often. To attract more fans, creators can also offer premium content
          or certain digital products/services as free to only subscribers who follow their channel.
        </li>
        <li>
          <b>Bring Other Creators: </b>
          Creators can also get other creators in their network to join Crio – these creators will
          be incentivized to get their own audience to subscribe to Crio. The more subscribers on
          Crio, the bigger the “Creator Pool”, and the more monthly income every creator makes.
        </li>
        <li>
          <b>
            {' '}
            The power lies in the collective community. The more creators on the platform, the more
            likely fans will subscribe, the larger the Creator Pool, and the more money each creator
            makes every month.{' '}
          </b>
        </li>
      </Fragment>
    ),
  },
  {
    key: 15,
    question: ' What  makes  Crio  different  than  other  platforms  like  Patreon  or Gumroad?',
    answer: (
      <Fragment>
        <li>
          Think of Crio as a universal subscription version of Patreon with the eCommerce
          capabilities of Gumroad.
        </li>
        <li>
          For one monthly subscription, fans can follow and essentially support any creator on Crio.
          In exchange, they get access to features like:
          <ul>
            <li>Premium content</li>
            <li>Free products creators have made accessible to only subscribers</li>
          </ul>
        </li>
        <li>
          <b>What are the benefits of a universal subscription system?</b>
          <ul>
            <li>
              <b>For Fans: </b>Paying one monthly subscription makes it easier for fans to
              financially support more creators vs. having to pay each time to support only a few
              (like on Patreon). That means more fans joining our community!
            </li>
            <li>
              <b>For Creators: </b> Crio shares subscription revenue with all creators each month as
              long as they have followers (even if its just 1 follower). This gives creators a more
              passive and recurring income stream. It also enables creators to upsell additional
              products to a higher-intent (subscribed) user base.
            </li>
          </ul>
        </li>
      </Fragment>
    ),
  },
];
