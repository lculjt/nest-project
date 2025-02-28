import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-github2";

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super({
            clientID: 'your-client-id',
            clientSecret: 'your-client-secret',
            callbackURL: 'http://localhost:3000/callback',
            scope: ['public_profile'],
        });
    }
    
    async validate(accessToken: string, refreshToken: string, profile: Profile) {
      return profile;
    }
}