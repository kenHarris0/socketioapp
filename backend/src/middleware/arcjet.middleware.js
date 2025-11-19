import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  try {
   
    const decision = await aj.protect(req);

    console.log("ARCJET DECISION:", decision.conclusion);
 const spoofed = decision.results.some(
      r => r.reason?.type === "BOT" && r.reason.spoofed === true
    );
    if (spoofed) {
      return res.status(403).json({ message: "Spoofed bot detected" });
    }

    
    if (decision.reason?.type === "BOT" && decision.reason.verified === true) {
      return res.status(403).json({ message: "Verified bot blocked" });
    }

   
    if (decision.reason?.type === "RATE_LIMIT" && decision.conclusion === "DENY") {
      return res.status(429).json({ message: "Rate limit exceeded, slow down" });
    }
    
    if (decision.conclusion === "DENY") {
      return res.status(403).json({ message: "Access denied by Arcjet" });
    }

    
    next();

  } catch (err) {
    console.log("ARCJET ERROR:", err);
    next();
  }
};
//sample response from arcjet(for reference)
/*{
  "id": "req_xxx",
  "conclusion": "ALLOW",
  "reason": {
    "type": "BOT",
    "verified": false,
    "spoofed": false
  },
  "results": [
    {
      "ruleId": "...",
      "conclusion": "ALLOW",
      "reason": {
        "type": "SHIELD",
        "shieldTriggered": false
      }
    },
    {
      "ruleId": "...",
      "conclusion": "ALLOW",
      "reason": {
        "type": "RATE_LIMIT",
        "max": 15,
        "remaining": 13,
        "reset": 40,
        "window": 60
      }
    },
    {
      "ruleId": "...",
      "conclusion": "ALLOW",
      "reason": {
        "type": "BOT",
        "verified": false,
        "spoofed": false,
        "allowed": [],
        "denied": []
      }
    }
  ]
}
*/